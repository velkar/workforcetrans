const ArrayList = require('arraylist');
const cassandra = require('cassandra-driver');
const LocalDate = require('cassandra-driver').types.LocalDate;
const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'wipapp'});

const nonDateFields = new ArrayList;
nonDateFields.add(['s1l1cm','s1l2cm','s2l1cm','s2l2cm']);

module.exports = {

	// DB read operations
	dbReadResourcesByPjt : function(pjtCode,callback){
		const query = 'SELECT * FROM skilltracker WHERE wbscode=?';
		const param = [pjtCode];
		client.execute(query,param,{ prepare: true }, function (err, result) {
			if (!err){
	           if ( result.rows.length > 0 ) {
	           		console.log(result.rows);
	           		return callback(result.rows);
	            } else {
	               console.log("No results");
	           }
	       }else{
	       		console.log(err);
	       }
    	});
	},

	dbReadResourcesByEmpId : function(empId,callback){
		const query = 'SELECT * FROM skilltracker WHERE empid=?';
		const param = [empId];
		client.execute(query,param,{ prepare: true }, function (err, result) {
			if (!err){
	           if ( result.rows.length > 0 ) {
	           		console.log(result.rows);
	           		return callback(result.rows);
	            } else {
	            	console.log("No results");
	           }
	       }else{
	       		console.log(err);
	       }
    	});
	},

	dbUpdateResourceByEmpId : function(empId,wbsId,fieldId,valId,callback){
		const query = 'UPDATE skilltracker SET '+fieldId+'=? WHERE empid=? AND wbscode=?';
		// Logic to check fields to be updated is date or string
		// if date then parse in to LocalDate format, which cassandra supports
		if(!nonDateFields.contains(fieldId)){
			valId = LocalDate.fromString(valId); 
		}
		const param = [valId,empId,wbsId];
		client.execute(query,param, { prepare: true },function (err, result) {
			if (!err){
				return callback({success: true, holder: result});
	        }else{
	        	console.log(err);
	        	throw err;
	       }
    	});
	},

	dbReadAccounts : function(callback){
		console.log("dbService.dbReadAccounts")
		return [{"id":'SBSA',"name":"SBSA"},
				{"id":'MASTER',"name":"MASTER"},
				{"id":'GOOGLE',"name":"GOOGLE"},
				{"id":'APPLE',"name":"APPLE"}];
	},

	dbReadProjects : function(callback){
		return [{"id":'SELFIE',"accountId":'SBSA',"name":"Selfie"},
				{"id":'NBOL',"accountId":'SBSA',"name":"nBOL"},
				{"id":'MAND',"accountId":'SBSA',"name":"Mandate Testing"}];
	}
};


﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.getAccounts = getAccounts;
        service.getProjects = getProjects;
        service.getResources = getResources;
        service.getResourcesByEmpId = getResourcesByEmpId;
        service.updateValues = updateValues;
        
        return service;

        function getAccounts() {
            console.log("UserService.getAccounts");
            return $http.get('/accounts').then(handleSuccess, handleError('Error getting accounts'));
        }

        function getProjects(accountId) {
            console.log("UserService.getProjects with accountId : "+accountId);
            return $http.get('/accounts/'+accountId).then(handleSuccess, handleError('Error getting projects'));
        }

        function getResources(accountId,projectId) {
            console.log("UserService.getResources with accountId, projectId : "+accountId+','+projectId);
            return $http.get('/accounts/'+accountId+'/projects/'+projectId).then(handleSuccess, handleError('Error getting resources'));
        }

        function getResourcesByEmpId(empId) {
            console.log("UserService.getResourcesByEmpId with empId : "+empId);
            return $http.get('/employee/'+empId).then(handleSuccess, handleError('Error getting resources'));
        }

        function updateValues(empId,wbscode,field,value) {
            console.log("UserService.updateValues with "+field +": "+value);
            return $http.put('/employee/'+empId+'/'+wbscode+'/'+field+'/'+value).then(handleSuccess, handleError('Error getting resources'));
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();

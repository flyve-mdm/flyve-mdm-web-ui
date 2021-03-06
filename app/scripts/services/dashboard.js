'use strict';

/**
 * @ngdoc service
 * @name FlyveMDM.DashboardFac
 * @description
 * # DashboardFac
 * Factory in the FlyveMDM.
 */
angular.module('FlyveMDM')
  .factory('DashboardFac', function (GLPI_API_URL, GlpiObjectNames, PluginObjectNames, AgentFac, UsersAdminFac, ComputersFac, $q, $http) {
    // Service logic
    function parseContentRange(contentRange) {
      var rangeFields = contentRange.split("\/");
      var pagination = {
        paginationFrom: parseInt(rangeFields[0]),
        paginationTotal: parseInt(rangeFields[1])
      };
      pagination.paginationSubTotal = parseInt(pagination.paginationTo - pagination.paginationFrom);
      return pagination;
    }
    // Public API here
    return {
      getAndroidVersions: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: GLPI_API_URL + GlpiObjectNames.Computer,
          params: {
            expand_dropdowns: true,
            range: '0-1000'
          }
        }).then(function (response) {
          var computerData = response.data;
          var computers = {
            android_version: [],
            android_version_quantity: []
          };
          var operatingsystem = [];
          var data = {};
          var computersMap = computerData.map(function (aComputer) {
            var rComputer = {};
            rComputer.operatingsystemversion = aComputer.operatingsystemversions_id;
            rComputer.operatingsystem = aComputer.operatingsystems_id;
            rComputer.serial = aComputer.serial;
            rComputer.computermodel = aComputer.computermodels_id;
            rComputer.name = aComputer.name;
            rComputer.id = aComputer.id;
            return rComputer;
          });
          computersMap.forEach(function (aComputer) {
            if (aComputer.operatingsystem === 'Android') {
              operatingsystem.push(aComputer.operatingsystemversion);
            }
          });
          operatingsystem.forEach(function (x) { data[x] = (data[x] || 0) + 1; });
          for (var key in data) {
            computers.android_version_quantity.push(data[key]);
          }
          computers.android_version = Object.keys(data);
          deferred.resolve(computers);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getInvitations: function () {
        var deferred = $q.defer();
        var pending = { status: 'pending' };
        var done = { status: 'done' };
        $http({
          method: 'GET',
          url: GLPI_API_URL + PluginObjectNames.Invitation
        }).then(function (response) {
          var invitationsPending = response.data.filter(function (invitation) {
            return Object.keys(pending).every(function (key) {
              return invitation[key] === pending[key];
            });
          });
          var invitationsDone = response.data.filter(function (invitation) {
            return Object.keys(done).every(function (key) {
              return invitation[key] === done[key];
            });
          });
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          var invitations = {
            done: invitationsDone.length,
            pending: invitationsPending.length,
            total: total
          };
          deferred.resolve(invitations);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfUsers: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + GlpiObjectNames.GlpiUser
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfPolicies: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + PluginObjectNames.Policy
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfPolicyCategories: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + PluginObjectNames.PolicyCategory
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfFiles: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + PluginObjectNames.File
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfFleets: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + PluginObjectNames.Fleet
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfApplications: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + PluginObjectNames.Application
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getNumberOfDevices: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + PluginObjectNames.Agent
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          deferred.resolve(total);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getMacAddress: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          params: {
            range: '0-0'
          },
          url: GLPI_API_URL + GlpiObjectNames.NetworkPort
        }).then(function (response) {
          var total = 0;
          if (response.headers()['content-range']) {
            total = parseContentRange(response.headers()['content-range']).paginationTotal;
          }
          console.log(total);
          $http({
            method: 'GET',
            params: {
              range: '0-' + total
            },
            url: GLPI_API_URL + GlpiObjectNames.NetworkPort
          }).then(function (response) {
            var macAddress = response.data.map(function (aMacAddress) {
              var rMacAddress = {
                id: aMacAddress.items_id,
                mac: aMacAddress.mac.toUpperCase()
              };
              return rMacAddress;
            });
            deferred.resolve(macAddress);
          }, function () {
            deferred.reject();
          });
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      getDevicesByRealName: function () {
        var deferred = $q.defer();
        var promises = {
          users: UsersAdminFac.getUsers(),
          devices: AgentFac.getDevices(),
          computers: ComputersFac.getComputers()
        };
        $q.all(promises).then(function (reponse) {
          var usersNames = reponse.users.map(function (x) { return x.email; });
          var computersNames = reponse.computers.map(function (x) { return x.id; });
          var realNames = reponse.devices.map(function (aDevice) {
            var rDevice = {};
            rDevice.id = aDevice.id;
            var computerPos = computersNames.indexOf(aDevice.computers_id);
            if (computerPos !== -1) {
              var aComputer = reponse.computers[computerPos];
              var userPos = usersNames.indexOf(aComputer.email);
              if (userPos !== -1) {
                if (reponse.users[userPos].realname !== null) {
                  rDevice.realname = reponse.users[userPos].realname;
                } else {
                  rDevice.realname = aDevice.name;
                }
              } else {
                rDevice.realname = aDevice.name;
              }
            } else {
              rDevice.realname = aDevice.name;
            }
            return rDevice;
          });
          deferred.resolve(realNames);
        });
        return deferred.promise;
      }
    };
  });

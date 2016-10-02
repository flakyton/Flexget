/* global angular */
(function () {
    'use strict';

    angular
        .module('plugins.history')
        .component('historyView', {
            templateUrl: 'plugins/history/history.tmpl.html',
            controllerAs: 'vm',
            controller: historyController
        });

    function historyController(historyService, linkHeaderParser) {
        var vm = this;

        vm.$onInit = activate;
        vm.search = search;

        vm.loadData = function (page) {
            options.page = page;
            getHistory();
        }

        var options = {
            page: 10
        }

        function activate() {
            getHistory();
        }

        function search() {
            historyService.getHistoryForTask({ task: vm.taskName })
                .then(setEntries)
                .cached(setEntries);
        }

        function getHistory() {
            historyService.getHistory(options)
                .then(setEntries)
                .cached(setEntries);
        }

        function setEntries(values) {
            console.log(linkHeaderParser.parse(values.headers.link));
            console.log(values);

            vm.headers = linkHeaderParser.parse(values.headers.link);
            vm.entries = values.data;
        }
    }
}());
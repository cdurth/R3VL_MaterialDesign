(function(){
  'use strict';

  angular.module('sideBarLeft')
         .service('sideBarLeftService', ['$q', menuItems]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function menuItems($q){
    var items = [
      {
        name: 'Join a Party!',
        avatar: 'vinyl',
        route: 'join'
      },
      {
        name: 'Create a Party!',
        avatar: 'party',
        route: 'create'
      },
      {
        name: 'About',
        avatar: 'question',
        route: 'about'
      },
      {
        name: 'Contact Us',
        avatar: 'email',
        route: 'contact'
      }
    ];

    // Promise-based API
    return {
      loadAll : function() {
        // Simulate async nature of real remote calls
        return $q.when(items);
      }
    };
  }

})();

App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },
  render :  function () {
    
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

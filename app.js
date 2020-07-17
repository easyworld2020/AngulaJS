(function () {
  'use strict';
  
  angular.module('ControllerAsApp', [])
  .factory('ShoppingListFactory', [function () {
    var factory = function (maxItems) {
      return new function () {
        var service = this;
        // List of shopping items
        var items = [];
      
        service.addItem = function (itemName, quantity) {
          if ((maxItems === undefined) ||
              (maxItems !== undefined) && (items.length < maxItems)) {
            var item = {
              name: itemName,
              quantity: quantity
            };
            items.push(item);
          }
          else {
            throw new Error("Max items (" + maxItems + ") reached.");
          }
        };
      
        service.removeItem = function (itemIndex) {
          items.splice(itemIndex, 1);
        };
      
        service.getItems = function () {
          return items;
        };
      };
    };
  
    return factory;
  }])


  .controller('ShoppingListController1', ['ShoppingListFactory',  function (ShoppingListFactory) {
    var list1 = this;
  
    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();
  
    list1.items = shoppingList.getItems();
  
    list1.itemName = "";
    list1.itemQuantity = "";
  
    list1.addItem = function () {
      shoppingList.addItem(list1.itemName, list1.itemQuantity);
    }
  
    list1.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
    };
  }])


  .controller('ShoppingListController2', ['ShoppingListFactory',  function (ShoppingListFactory) {
      var list2 = this;
    
      // Use factory to create new shopping list service
      var shoppingList = ShoppingListFactory(3);
    
      list2.items = shoppingList.getItems();
    
      list2.itemName = "";
      list2.itemQuantity = "";
    
      list2.addItem = function () {
        try {
          shoppingList.addItem(list2.itemName, list2.itemQuantity);
        } catch (error) {
          list2.errorMessage = error.message;
        }
    
      }
    
      list2.removeItem = function (itemIndex) {
        shoppingList.removeItem(itemIndex);
        list2.errorMessage ='';
      };
    }]);
  })();
  
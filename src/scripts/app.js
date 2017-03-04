import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import {ToDoList} from './ToDo.js';


const AppRouter = Backbone.Router.extend({
  initialize: function(){
  Backbone.history.start();
  },

  routes:{
    '' : 'showHome',
  },

  showHome: function(){
    ReactDOM.render(<ToDoList/>, document.querySelector('#app-container'))
  }

})

let app = new AppRouter()

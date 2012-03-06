IONUX.Views.DataResourceView = Backbone.View.extend({

  el: "#data-resources",

  initialize: function(){
    _.bindAll(this, "render");
    this.collection.bind("reset", this.render);
  },
  
  render: function(){
    this.$el.empty().show();
    _.each(this.collection.models, function(dataresource) {
        this.$el.append(new IONUX.Views.DataResourceItemView({model:dataresource}).render().el);
    }, this);
    return this;
  },

})


IONUX.Views.DataResourceItemView = Backbone.View.extend({

  tagName:"ul",

  template: _.template($("#data-resource-item-tmpl").html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});


IONUX.Views.DataResourceDetailView = Backbone.View.extend({

  el: "#data-resource-detail",

  template: _.template($("#data-resource-detail-tmpl").html()),

  initialize: function(){
    _.bindAll(this, "render");
    this.model.bind("change", this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON())).show();
    return this;
  }

});


/* Observatories */

IONUX.Views.ObservatoriesView = Backbone.View.extend({

  el: "#observatories-container",

  template: _.template($("#observatories-tmpl").html()),

  events: {
    "click .create_new":"show_create_new_form"
    //"click table tr":"show_facepage"
  },

  initialize: function(){
    _.bindAll(this, "render", "show_create_new_form");
    this.collection.bind("reset", this.render);
  },
  
  render: function(){
    this.$el.html(this.template({"collection":this.collection.toJSON()})).show();
    return this;
  },

  //show_facepage: function(){ console.log("show_facepage"); },

  show_create_new_form: function(){
    if (_.isUndefined(this.observatories_create_new_view)){
      this.observatories_create_new_view = new IONUX.Views.ObservatoryCreateNewView(); 
    }
    this.observatories_create_new_view.render();
  }
  
});


IONUX.Views.ObservatoriesItemView = Backbone.View.extend({

  tagName: "ul",

  template: _.template($("#observatories-item-tmpl").html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});


IONUX.Views.ObservatoriesDetailView = Backbone.View.extend({

  el: "#observatories-detail",

  template: _.template($("#observatories-detail-tmpl").html()),

  initialize: function(){
    _.bindAll(this, "render");
    this.model.bind("change", this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON())).show();
    return this;
  }

});



IONUX.Views.ObservatoryCreateNewView = Backbone.View.extend({

  el: "#observatories-new",

  template: _.template($("#new-observatory-tmpl").html()),

  events: {
    "click input[type='submit']":"create_new",
    "submit input[type='submit']":"create_new",
    "click .cancel":"cancel"
  },

  initialize: function(){
    _.bindAll(this, "create_new");
  },

  render: function(){
    this.$el.empty().html(this.template({})).show();
  },

  create_new: function(evt){
    evt.preventDefault();
    this.$el.find("input[type='submit']").attr("disabled", true).val("Saving...");
    var mf = new IONUX.Models.Observatory();
    $.each(this.$el.find("input,textarea").not("input[type='submit'],input[type='cancel']"), function(i, e){
      var key = $(e).attr("name"), val = $(e).val();
      var kv = {};
      kv[key] = val;
      mf.set(kv);
    });
    var self = this;
    mf.save(null, {success:function(model, resp){
      self.$el.hide();
    }});
  },

  cancel: function(){
    this.$el.hide();
  }

});




/* Instruments */

IONUX.Views.InstrumentsView = Backbone.View.extend({

  el:"#instruments-container",

  template: _.template($("#instruments-tmpl").html()),

  events: { },

  initialize: function(){
    _.bindAll(this, "render");
  },
  
  render: function(){
    this.$el.html(this.template({}));
    return this;
  }
});



/* Platforms */

IONUX.Views.PlatformsView = Backbone.View.extend({

  el:"#platforms-container",

  template: _.template($("#platforms-tmpl").html()),

  events: { },

  initialize: function(){
    _.bindAll(this, "render");
  },
  
  render: function(){
    this.$el.html(this.template({}));
    return this;
  }
});



IONUX.Views.ObservatoryModalView = Backbone.View.extend({

  el: "#observatory-modal",

  template: _.template($("#observatory-modal-tmpl").html()),

  events: {
    "click .modal-body":"clicked",
    "click .btn-save":"save",
    "click .btn-close":"close"
  },

  initialize: function(){
    _.bindAll(this, "render", "clicked", "save", "close");
  },
  
  render: function(){
    this.$el.html(this.template({}));
    return this;
  },

  clicked: function(){
    console.log("ObservatoryModalView clicked");
  },

  save: function(){
    console.log("ObservatoryModalView save");
    this.$el.modal("hide");
  },

  close: function(){
    console.log("ObservatoryModalView close");
    this.$el.modal("hide");
  }
});
 


IONUX.Views.ObservatoryFacepage = Backbone.View.extend({

  el: "#observatory-facepage-container",

  template: _.template($("#observatory-facepage-tmpl").html()),

  //events: { },

  initialize: function(){
    _.bindAll(this, "render");
    this.model.bind("change", this.render);
  },

  render: function(){
    console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON())).show();
  }

});


IONUX.Views.PlatformFacepage = Backbone.View.extend({

  el: "#platform-facepage-container",

  template: _.template($("#platform-facepage-tmpl").html()),

  //events: { },

  initialize: function(){
    _.bindAll(this, "render");
    this.model.bind("change", this.render);
  },

  render: function(){
    console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON())).show();
  }

});

IONUX.Views.InstrumentFacepage = Backbone.View.extend({

  el: "#instrument-facepage-container",

  template: _.template($("#instrument-facepage-tmpl").html()),

  //events: { },

  initialize: function(){
    _.bindAll(this, "render");
    this.model.bind("change", this.render);
  },

  render: function(){
    console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON())).show();
  }

});


!function(a){var b=function(d,c){this.$element=a(d);this.options=a.extend({},a.fn.collapse.defaults,c);if(this.options.parent){this.$parent=a(this.options.parent);}this.options.toggle&&this.toggle();};b.prototype={constructor:b,dimension:function(){var c=this.$element.hasClass("width");return c?"width":"height";},show:function(){var f,c,e,d;if(this.transitioning){return;}f=this.dimension();c=a.camelCase(["scroll",f].join("-"));e=this.$parent&&this.$parent.find("> .accordion-group > .in");if(e&&e.length){d=e.data("collapse");if(d&&d.transitioning){return;}e.collapse("hide");d||e.data("collapse",null);}this.$element[f](0);this.transition("addClass",a.Event("show"),"shown");this.$element[f](this.$element[0][c]);},hide:function(){var c;if(this.transitioning){return;}c=this.dimension();this.reset(this.$element[c]());this.transition("removeClass",a.Event("hide"),"hidden");this.$element[c](0);},reset:function(c){var d=this.dimension();this.$element.removeClass("collapse")[d](c||"auto")[0].offsetWidth;this.$element[c!==null?"addClass":"removeClass"]("collapse");return this;},transition:function(g,d,e){var f=this,c=function(){if(d.type=="show"){f.reset();}f.transitioning=0;f.$element.trigger(e);};this.$element.trigger(d);if(d.isDefaultPrevented()){return;}this.transitioning=1;this.$element[g]("in");a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,c):c();},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]();}};a.fn.collapse=function(c){return this.each(function(){var f=a(this),e=f.data("collapse"),d=typeof c=="object"&&c;if(!e){f.data("collapse",(e=new b(this,d)));}if(typeof c=="string"){e[c]();}});};a.fn.collapse.defaults={toggle:true};a.fn.collapse.Constructor=b;a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(h){var g=a(this),c,f=g.attr("data-target")||h.preventDefault()||(c=g.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),d=a(f).data("collapse")?"toggle":g.data();a(f).collapse(d);});});}(window.jQuery);
var script = {
  data() {
    return {
      showPassword: false,
      password: "Sayed M"
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  },
  computed: {
    inputType() {
      return this.showPassword ? "text" : "password";
    },
    toggleBtnIcon() {
      return this.showPassword ? "🐵" : "🙈";
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "app" } }, [
    _c("div", { staticClass: "main" }, [
      _c("div", { staticClass: "input-group" }, [
        _vm.inputType === "checkbox"
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              staticClass: "input",
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.password)
                  ? _vm._i(_vm.password, null) > -1
                  : _vm.password
              },
              on: {
                change: function($event) {
                  var $$a = _vm.password,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v);
                    if ($$el.checked) {
                      $$i < 0 && (_vm.password = $$a.concat([$$v]));
                    } else {
                      $$i > -1 &&
                        (_vm.password = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)));
                    }
                  } else {
                    _vm.password = $$c;
                  }
                }
              }
            })
          : _vm.inputType === "radio"
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              staticClass: "input",
              attrs: { type: "radio" },
              domProps: { checked: _vm._q(_vm.password, null) },
              on: {
                change: function($event) {
                  _vm.password = null;
                }
              }
            })
          : _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              staticClass: "input",
              attrs: { type: _vm.inputType },
              domProps: { value: _vm.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password = $event.target.value;
                }
              }
            }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "input-group-icon",
            on: { click: _vm.togglePassword }
          },
          [_vm._v("\n        " + _vm._s(_vm.toggleBtnIcon) + "\n      ")]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "a",
      {
        staticClass: "credits",
        attrs: {
          target: "_blank",
          href:
            "https://dribbble.com/shots/4505888-Show-hide-password-with-emoji"
        }
      },
      [_vm._v("\n    Show/hide password with emoji by - Emanuel Serbanoiu\n  ")]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7f58187a_0", { source: "\n@import url(\"https://fonts.googleapis.com/css2?family=Poppins&display=swap\");\nhtml,\nbody,\n#app {\n  height: 100%;\n}\nbody {\n  background-color: #e3e6f1;\n}\nbody,\nbutton,\ninput {\n  font-family: \"Poppins\", sans-serif;\n}\n.main {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.input-group {\n  display: inline-flex;\n  background-color: #ffffff;\n  align-items: center;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  font-size: 2rem;\n  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);\n}\n.input-group input {\n  border: 0;\n  padding: 1rem;\n}\n.input-group input:focus {\n  outline: 0;\n}\n.input-group-icon {\n  padding: 0.5rem;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  align-self: stretch;\n  border: 0;\n  background-color: inherit;\n  cursor: pointer;\n}\n.credits {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  background-color: #212121;\n  color: #ffffff;\n  text-decoration: none;\n  padding: 1rem;\n  text-align: center;\n}\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue"],"names":[],"mappings":";AA+CA,4EAAA;AACA;;;EAGA,YAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;;;EAGA,kCAAA;AACA;AACA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AACA;AACA;EACA,oBAAA;EACA,yBAAA;EACA,mBAAA;EACA,qBAAA;EACA,gBAAA;EACA,eAAA;EACA,+CAAA;AACA;AACA;EACA,SAAA;EACA,aAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,eAAA;EACA,oBAAA;EACA,uBAAA;EACA,mBAAA;EACA,mBAAA;EACA,SAAA;EACA,yBAAA;EACA,eAAA;AACA;AACA;EACA,eAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,yBAAA;EACA,cAAA;EACA,qBAAA;EACA,aAAA;EACA,kBAAA;AACA","file":"pen.vue","sourcesContent":["<!-- Use preprocessors via the lang attribute! e.g. <template lang=\"pug\"> -->\n<template>\n  <div id=\"app\">\n    <div class=\"main\">\n      <div class=\"input-group\">\n        <input :type=\"inputType\" v-model=\"password\" class=\"input\" />\n        <button class=\"input-group-icon\" @click=\"togglePassword\">\n          {{ toggleBtnIcon }}\n        </button>\n      </div>\n    </div>\n    <a\n      class=\"credits\"\n      target=\"_blank\"\n      href=\"https://dribbble.com/shots/4505888-Show-hide-password-with-emoji\"\n    >\n      Show/hide password with emoji by - Emanuel Serbanoiu\n    </a>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      showPassword: false,\n      password: \"Your Secret\"\n    };\n  },\n  methods: {\n    togglePassword() {\n      this.showPassword = !this.showPassword;\n    }\n  },\n  computed: {\n    inputType() {\n      return this.showPassword ? \"text\" : \"password\";\n    },\n    toggleBtnIcon() {\n      return this.showPassword ? \"🐵\" : \"🙈\";\n    }\n  }\n};\n</script>\n\n<!-- Use preprocessors via the lang attribute! e.g. <style lang=\"scss\"> -->\n<style>\n@import url(\"https://fonts.googleapis.com/css2?family=Poppins&display=swap\");\nhtml,\nbody,\n#app {\n  height: 100%;\n}\nbody {\n  background-color: #e3e6f1;\n}\nbody,\nbutton,\ninput {\n  font-family: \"Poppins\", sans-serif;\n}\n.main {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.input-group {\n  display: inline-flex;\n  background-color: #ffffff;\n  align-items: center;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  font-size: 2rem;\n  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);\n}\n.input-group input {\n  border: 0;\n  padding: 1rem;\n}\n.input-group input:focus {\n  outline: 0;\n}\n.input-group-icon {\n  padding: 0.5rem;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  align-self: stretch;\n  border: 0;\n  background-color: inherit;\n  cursor: pointer;\n}\n.credits {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  background-color: #212121;\n  color: #ffffff;\n  text-decoration: none;\n  padding: 1rem;\n  text-align: center;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;
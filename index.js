var testRunner = require('./testRunner');

var ZSchema = require('z-schema');
var JaySchema = require('jayschema');
var jjv = require('jjv');
var jassi = require('jassi');
var jsv = require('JSV');
var JsonSchema = require('jsonschema');
var tv4 = require('tv4');
var JsonModel = require('json-model');
var Themis = require('themis');
var imjv = require('is-my-json-valid');
var jsck = require('jsck');
var requestValidator = require('request-validator');
var skeemas = require('skeemas');

testRunner([
	{
		name: 'is-my-json-valid',
		setup: function (schema) {
			return imjv(schema);
		},
		test: function (instance, json, schema) {
			return !!instance(json);
		}
	},
	{
		name: 'themis',
		setup: function (schema) {
			return Themis.validator(schema);
		},
		test: function (instance, json, schema) {
			return instance(json, '0').valid;
		}
	},
	{
		name: 'z-schema 3',
		setup: function () {
			return new ZSchema({
				ignoreUnresolvableReferences: true
			});
		},
		test: function (instance, json, schema) {
			return instance.validate(json, schema);
		}
	},
	{
		name: 'jjv',
		setup: function () {
			return jjv();
		},
		test: function (instance, json, schema) {
			return instance.validate(schema, json) === null;
		}
	},
	{
		name: 'skeemas',
		setup: function (schema) {
			return skeemas;
		},
		test: function (instance, json, schema) {
			return instance.validate(json, schema).valid;
		}
	},
	{
		name: 'jayschema',
		setup: function () {
			return new JaySchema();
		},
		test: function (instance, json, schema) {
			return instance.validate(json, schema).length === 0;
		}
	},
	{
		name: 'jsck',
		setup: function (schema) {
			return new jsck.draft4(schema);
		},
		test: function (instance, json, schema) {
			return instance.validate(json).valid;
		}
	},
	{
		name: 'jassi',
		setup: function (schema) {
			return jassi;
		},
		test: function (instance, json, schema) {
			return instance(json, schema).length === 0;
		}
	},

	{
		name: 'JSV',
		setup: function (schema) {
			return jsv;
		},
		test: function (instance, json, schema) {
			return instance.JSV.createEnvironment().validate(json, schema).errors.length === 0;
		}
	},
	{
		name: 'request-validator',
		setup: function (schema) {
			return requestValidator(schema);
		},
		test: function (instance, json, schema) {
			try {
				instance(json);
				return true;
			}
			catch (e) {
				return false;
			}
		}
	},
	{
		name: 'json-model',
		setup: function (schema) {
			return JsonModel.validator(schema);
		},
		test: function (instance, json, schema) {
			return instance(json).valid;
		}
	},
	{
		name: 'tv4',
		setup: function () {
			return tv4;
		},
		test: function (instance, json, schema) {
			return instance.validateResult(json, schema).valid;
		}
	},
	{
		name: 'jsonschema',
		setup: function () {
			return new JsonSchema.Validator();
		},
		test: function (instance, json, schema) {
			return instance.validate(json, schema).errors.length === 0;
		}
	}
]);

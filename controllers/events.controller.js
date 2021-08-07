'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var async = require("async");
const lib = require("../utils/lib");
let console = conf.console;

module.exports = {
	create: create,
	delete: del,
	update: update,
	join: join,
	details: details,
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function create(req, res) {
	let event = req.body;
	if (!(event.name && event.startDate && event.endDate && event.status && event.price))
		return send.invalid(res);
	lib.insertQuery(conf.dbTables.event, event, function (err, data) {
		if (err)
			return send.failure(res, err);
		send.ok(res);
	});
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function del(req, res) {
	let event = req.params.event;
	lib.deleteQuery(conf.dbTables.event, { name: event }, function (err, data) {
		if (err)
			return send.failure(res, err);
		send.ok(res);
	});
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function update(req, res) {
	let event = req.body;
	if (!(event.name))
		return send.invalid(res);
	lib.updateQuery(conf.dbTables.event, event, { name: event.name }, function (err, data) {
		if (err)
			return send.failure(res, err);
		send.ok(res);
	});
}

/**
 * Join an event
 * @param {*} req 
 * @param {*} res 
 */
function join(req, res) {
	let event = req.params.event;
	let user = req.body;
	if (!(user.username))
		return send.invalid(res);
	user.event = event;
	async.waterfall([
		lib.passOn(user),
		getEvent,
		getUser,
		validateUserAndUpdateWallet,
		addParticipant,
		updateUser,
	], function (err, result) {
		if (err)
			return send.failure(res, err);
		send.ok(res);
	});
}

function getEvent(obj, next) {
	lib.selectQuery(conf.dbTables.event, { name: obj.event }, function (err, data) {
		if (err)
			return next(err);
		if (!data.rows.length)
			return next("invalid event");
		data = data.rows[0];
		obj.eventDetails = data;
		next(null, obj);
	});
}

function getUser(obj, next) {
	lib.selectQuery(conf.dbTables.user, { username: obj.username }, function (err, data) {
		if (err)
			return next(err);
		if (!data.rows.length)
			return next("invalid user");
		data = data.rows[0];
		obj.userDetails = data;
		next(null, obj);
	});
}

function validateUserAndUpdateWallet(obj, next) {
	if (obj.userDetails.wallet < obj.eventDetails.price)
		return next("Transaction failed, please update your wallet");
	obj.userDetails.wallet -= obj.eventDetails.price;
	next(null, obj);
}

function addParticipant(obj, next) {
	let query = {
		username: obj.username,
		event: obj.event,
	};
	lib.insertQuery(conf.dbTables.participants, query, function (err, data) {
		if (err)
			return next(err);
		next(null, obj);
	});
}

function updateUser(obj, next) {
	let query = {
		username: obj.username
	};
	let update = {
		wallet: obj. userDetails.wallet
	};
	lib.updateQuery(conf.dbTables.user, update, query, function (err, data) {
		if (err)
			return next(err);
		next(null, obj);
	});
}


/**
 * Get event details
 * @param {*} req 
 * @param {*} res 
 */
function details(req, res) {
	let event = req.params.event;
	let user = req.body;
	if (!(user.username))
		return send.invalid(res);
	user.event = event;
	async.waterfall([
		lib.passOn(user),
		getEvent,
		getParticipants,
	], function (err, data) {
		if (err)
			return send.failure(res, err);
		let result = data.eventDetails;
		result.participants = obj.participants;
		send.ok(res, result);
	});
}

function getParticipants(obj, next) {
	let query = {
		event: obj.event,
	};
	lib.selectQuery(conf.dbTables.participants, query, function (err, data) {
		if (err)
			return next(err);
		obj.participants = data.rows;
		next(null, obj);
	});
}
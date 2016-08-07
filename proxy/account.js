const UserModel = require('../models/users');

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByLoginName = (username, callback) => {
  UserModel.findOne({ username: new RegExp(`^${username}$`, 'i') }, callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */

exports.getUserById = (id, callback) => {
  if (!id) {
    return callback();
  }
  return UserModel.findOne({ _id: id }, callback);
};

/**
 * 根据邮箱，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 邮箱地址
 * @param {Function} callback 回调函数
 */
exports.getUserByMail = (email, callback) => {
  UserModel.findOne({ email }, callback);
};


/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = (query, opt, callback) => {
  UserModel.find(query, '', opt, callback);
};

/**
 * 创建一个用户实例
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {Object} obj 需要存入的用户信息
 * @param {Function} callback 回调函数
 */
exports.createEntity = (obj, callback) => {
  const entity = new UserModel(obj);
  entity.save(callback);
};

/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50742 (5.7.42)
 Source Host           : localhost:3306
 Source Schema         : xmart_demo

 Target Server Type    : MySQL
 Target Server Version : 50742 (5.7.42)
 File Encoding         : 65001

 Date: 06/07/2023 20:24:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_all_devices
-- ----------------------------
DROP TABLE IF EXISTS `t_all_devices`;
CREATE TABLE `t_all_devices` (
  `id` varchar(32) NOT NULL COMMENT '设备id',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '色谱仪图像',
  `analyse_value` text COMMENT '识别值',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `state` int(2) DEFAULT NULL COMMENT '设备状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for t_audit_log
-- ----------------------------
DROP TABLE IF EXISTS `t_audit_log`;
CREATE TABLE `t_audit_log` (
  `id` varchar(32) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '主键采用uuid',
  `add_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `edit_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `version` int(16) unsigned DEFAULT '0' COMMENT '乐观锁',
  `deleted` tinyint(1) unsigned DEFAULT '0' COMMENT '逻辑删除 0 未删除 1 已删除',
  `user_id` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户名',
  `description` mediumtext CHARACTER SET utf8mb4 COMMENT '描述',
  `method` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '方法名',
  `params` mediumtext CHARACTER SET utf8mb4 COMMENT '参数',
  `log_type` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '日志类型',
  `exception_detail` mediumtext CHARACTER SET utf8mb4 COMMENT '异常详细',
  `user_types` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '操作用户的类型',
  `ip` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '登陆的ip',
  `dept_name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '部门名称',
  `status` tinyint(8) DEFAULT NULL COMMENT '状态（1 成功   2失败）',
  `terminal_name` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '登录终端名称',
  `type` tinyint(8) DEFAULT NULL COMMENT '类型（1.操作日志  2.登录日志）',
  `operator_id` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '操作人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统操作日志表';

-- ----------------------------
-- Table structure for t_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission` (
  `id` varchar(32) NOT NULL COMMENT '主键采用uuid',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `edit_time` datetime DEFAULT NULL COMMENT '修改时间',
  `version` int(16) unsigned NOT NULL DEFAULT '0' COMMENT '乐观锁',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 未删除 1 已删除',
  `role_id` varchar(32) NOT NULL COMMENT '角色id',
  `pc_permission` mediumtext COMMENT 'pc权限描述',
  `app_permission` mediumtext COMMENT 'app权限描述',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_role_id` (`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统管理-权限管理';

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` varchar(32) NOT NULL COMMENT '主键采用uuid',
  `add_time` datetime DEFAULT NULL COMMENT '新增时间',
  `edit_time` datetime DEFAULT NULL COMMENT '修改时间',
  `version` int(16) unsigned NOT NULL DEFAULT '0' COMMENT '乐观锁',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 未删除 1 已删除',
  `role_code` varchar(64) DEFAULT NULL COMMENT '角色编码',
  `role_name` varchar(64) NOT NULL COMMENT '角色名',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `operator_id` varchar(32) DEFAULT NULL COMMENT '操作人id',
  `operator_name` varchar(32) DEFAULT NULL COMMENT '操作人名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统管理-角色管理';

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` varchar(32) NOT NULL COMMENT '主键采用uuid',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `edit_time` datetime DEFAULT NULL COMMENT '编辑时间',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除 0 未删除 1 已删除',
  `user_name` varchar(32) NOT NULL COMMENT '用户名',
  `account` varchar(16) NOT NULL COMMENT '账号',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `salt` varchar(16) NOT NULL COMMENT '密码盐值',
  `role_id` text NOT NULL COMMENT '角色id',
  `types` varchar(32) DEFAULT NULL COMMENT '人员类型(逗号拼接)',
  `remark` varchar(512) DEFAULT NULL COMMENT '备注',
  `operator_id` varchar(32) DEFAULT NULL COMMENT '操作人id',
  `operator_name` varchar(32) DEFAULT NULL COMMENT '操作人名称',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_account` (`account`) USING BTREE,
  KEY `idx_types` (`types`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统管理-用户管理';

SET FOREIGN_KEY_CHECKS = 1;

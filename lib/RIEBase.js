'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIEBase = function (_React$Component) {
  _inherits(RIEBase, _React$Component);

  function RIEBase(props) {
    _classCallCheck(this, RIEBase);

    var _this = _possibleConstructorReturn(this, (RIEBase.__proto__ || Object.getPrototypeOf(RIEBase)).call(this, props));

    _this.doValidations = function (value) {
      if (_this.props.validate) {
        _this.setState({ invalid: !_this.props.validate(value) });
      } else if (_this.validate) {
        _this.setState({ invalid: !_this.validate(value) });
      }
    };

    _this.selectInputText = function (element) {
      if (element.setSelectionRange) element.setSelectionRange(0, element.value.length);
    };

    _this.elementClick = function (event) {
      throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate et.c";
    };

    _this.componentWillReceiveProps = function (nextProps) {
      if ('value' in nextProps) _this.setState({ loading: false, editing: false, invalid: false, newValue: null });
    };

    _this.commit = function (value) {
      if (!_this.state.invalid) {
        var newProp = {};
        newProp[_this.props.propName] = value;
        _this.setState({ loading: true, newValue: value });
        _this.props.change(newProp);
      }
    };

    _this.makeClassString = function () {
      var classNames = [];
      if (_this.props.className) classNames.push(_this.props.className);
      if (_this.editing && _this.props.classEditing) classNames.push(_this.props.classEditing);
      if (_this.loading && _this.props.classLoading) classNames.push(_this.props.classLoading);
      if (_this.disabled && _this.props.classDisabled) classNames.push(_this.props.classDisabled);
      if (_this.state.invalid && _this.props.classInvalid) classNames.push(_this.props.classInvalid);
      return classNames.join(' ');
    };

    _this.render = function () {
      return _react2.default.createElement(
        'span',
        _extends({}, _this.props.defaultProps, { tabindex: '0', className: _this.makeClassString(),
          onClick: _this.elementClick }),
        _this.props.value
      );
    };

    if (!_this.props.propName) throw "RTFM: missing 'propName' prop";
    if (!_this.props.change) throw "RTFM: missing 'change' prop";
    if (_this.props.value == undefined) throw "RTFM: missing 'value' prop";

    _this.state = {
      editing: false,
      loading: false,
      disabled: false,
      invalid: false
    };
    return _this;
  }

  _createClass(RIEBase, [{
    key: 'editing',
    get: function get() {
      if (this.props.hasOwnProperty('editing')) {
        return this.props.editing;
      }
      return this.state.editing;
    }
  }, {
    key: 'loading',
    get: function get() {
      if (this.props.hasOwnProperty('loading')) {
        return this.props.loading;
      }
      return this.state.loading;
    }
  }, {
    key: 'disabled',
    get: function get() {
      if (this.props.hasOwnProperty('loading')) {
        return this.props.loading;
      }
      return this.state.loading;
    }
  }]);

  return RIEBase;
}(_react2.default.Component);

RIEBase.propTypes = {
  value: _propTypes2.default.any.isRequired,
  change: _propTypes2.default.func.isRequired,
  propName: _propTypes2.default.string.isRequired,
  editProps: _propTypes2.default.object,
  defaultProps: _propTypes2.default.object,
  isDisabled: _propTypes2.default.bool,
  validate: _propTypes2.default.func,
  shouldBlockWhileLoading: _propTypes2.default.bool,
  classLoading: _propTypes2.default.string,
  classEditing: _propTypes2.default.string,
  classDisabled: _propTypes2.default.string,
  classInvalid: _propTypes2.default.string,
  className: _propTypes2.default.string,
  editing: _propTypes2.default.bool,
  loading: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};
exports.default = RIEBase;
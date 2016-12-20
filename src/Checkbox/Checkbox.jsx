import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import mdlUpgrade from 'react-mdl/lib/utils/mdlUpgrade';
import './Checkbox.css'

const propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    ripple: PropTypes.bool
};

class Checkbox extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.disabled !== prevProps.disabled) {
            const fnName = this.props.disabled ? 'disable' : 'enable';
            findDOMNode(this).MaterialCheckbox[fnName]();
        }
        if (this.props.checked !== prevProps.checked) {
            const fnName = this.props.checked ? 'check' : 'uncheck';
            findDOMNode(this).MaterialCheckbox[fnName]();
        }
    }

    onChange = function() {
        return true;
    }

    render() {
        const { className, label, ripple, indeterminate, ...inputProps } = this.props;

        const classes = classNames('mdl-checkbox mdl-js-checkbox', {
            'mdl-js-ripple-effect': ripple,
            'md-indeterminate': indeterminate,
            'aria-checked':"mixed"
        }, className);

        return ( 
            <label className={classes}>
                <input                        
                    type="checkbox"
                    className="mdl-checkbox__input"
                    onChange={this.onChange}
                    { ...inputProps }
                />
                {label && <span className="mdl-checkbox__label">{label}</span>}
            </label>
        );
    }
}

Checkbox.propTypes = propTypes;

export default mdlUpgrade(Checkbox, true);

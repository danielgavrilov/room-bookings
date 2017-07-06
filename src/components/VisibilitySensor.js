/* eslint default-case: 0 */

/*

Adapted from: https://github.com/joshwnj/react-visibility-sensor/

The MIT License (MIT)

Copyright (c) 2014 Josh Johnston

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Tell whether the rect is visible, given an offset
//
// return: boolean
function isVisibleWithOffset(offset, rect, containmentRect) {
    var offsetDir = offset.direction;
    var offsetVal = offset.value;

    // Rules for checking different kind of offsets. In example if the element is
    // 90px below viewport and offsetTop is 100, it is considered visible.
    switch (offsetDir) {
        case 'top':
            return ((containmentRect.top + offsetVal) < rect.top) && (containmentRect.bottom > rect.bottom) && (containmentRect.left < rect.left) && (containmentRect.right > rect.right);

        case 'left':
            return ((containmentRect.left + offsetVal) < rect.left) && (containmentRect.bottom > rect.bottom) && (containmentRect.top < rect.top) && (containmentRect.right > rect.right);

        case 'bottom':
            return ((containmentRect.bottom - offsetVal) > rect.bottom) && (containmentRect.left < rect.left) && (containmentRect.right > rect.right) && (containmentRect.top < rect.top);

        case 'right':
            return ((containmentRect.right - offsetVal) > rect.right) && (containmentRect.left < rect.left) && (containmentRect.top < rect.top) && (containmentRect.bottom > rect.bottom);
    }
}

var containmentPropType = PropTypes.any;

if (typeof window !== 'undefined') {
    containmentPropType = PropTypes.instanceOf(window.Element);
}

/*
function throttle(callback, limit) {
    var wait = false;
    return function() {
        if (!wait) {
            wait = true;
            setTimeout(function() {
                callback();
                wait = false;
            }, limit);
        }
    }
}

function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
*/

class VisibilitySensor extends Component {

    static propTypes = {
        onChange: PropTypes.func,
        active: PropTypes.bool,
        partialVisibility: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['top', 'right', 'bottom', 'left']), ]),
        delayedCall: PropTypes.bool,
        offset: PropTypes.oneOfType([
        PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
            bottom: PropTypes.number,
            right: PropTypes.number
        }),
        // deprecated offset property
        PropTypes.shape({
            direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
            value: PropTypes.number
        })]),
        scrollCheck: PropTypes.bool,
        scrollDelay: PropTypes.number,
        scrollThrottle: PropTypes.number,
        resizeCheck: PropTypes.bool,
        resizeDelay: PropTypes.number,
        resizeThrottle: PropTypes.number,
        intervalCheck: PropTypes.bool,
        intervalDelay: PropTypes.number,
        containment: containmentPropType,
        children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func, ]),
        minTopValue: PropTypes.number,
    }

    static defaultProps = {
        active: true,
        partialVisibility: false,
        minTopValue: 0,
        scrollCheck: false,
        scrollDelay: 250,
        scrollThrottle: -1,
        resizeCheck: false,
        resizeDelay: 250,
        resizeThrottle: -1,
        intervalCheck: true,
        intervalDelay: 100,
        delayedCall: false,
        offset: {},
        containment: null,
        children: React.createElement('span')
    }

    constructor(props) {
        super(props);
        this.state = {
            isVisible: null,
            visibilityRect: {}
        }
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        if (this.props.active) {
            this.startWatching();
        }
    }

    componentWillUnmount() {
        this.stopWatching();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            this.setState({
                isVisible: null,
                visibilityRect: {}
            });
            this.startWatching();
        } else {
            this.stopWatching();
        }
    }

    getContainer() {
        return this.props.containment || window;
    }

    addEventListener(target, event, delay, throttle) {
        if (!this.debounceCheck) {
            this.debounceCheck = {};
        }

        var timeout;
        var func;

        var later = function() {
            timeout = null;
            this.check();
        }.bind(this);

        if (throttle > -1) {
            func = function() {
                if (!timeout) {
                    timeout = setTimeout(later, throttle || 0);
                }
            };
        } else {
            func = function() {
                clearTimeout(timeout);
                timeout = setTimeout(later, delay || 0);
            };
        }

        var info = {
            target: target,
            fn: func,
            getLastTimeout: function() {
                return timeout;
            },
        };

        target.addEventListener(event, info.fn);
        this.debounceCheck[event] = info;
    }

    startWatching() {
        if (this.debounceCheck || this.interval) {
            return;
        }

        if (this.props.intervalCheck) {
            this.interval = setInterval(this.check, this.props.intervalDelay);
        }

        if (this.props.scrollCheck) {
            this.addEventListener(
            this.getContainer(), 'scroll',
            this.props.scrollDelay,
            this.props.scrollThrottle);
        }

        if (this.props.resizeCheck) {
            this.addEventListener(
            window, 'resize',
            this.props.resizeDelay,
            this.props.resizeThrottle);
        }

        this.addEventListener(window, 'refreshViewport', 100, -1);

        // if dont need delayed call, check on load ( before the first interval fires )
        !this.props.delayedCall && this.check();
    }

    stopWatching() {
        if (this.debounceCheck) {
            // clean up event listeners and their debounce callers
            for (var debounceEvent in this.debounceCheck) {
                if (this.debounceCheck.hasOwnProperty(debounceEvent)) {
                    var debounceInfo = this.debounceCheck[debounceEvent];

                    clearTimeout(debounceInfo.getLastTimeout());
                    debounceInfo.target.removeEventListener(
                    debounceEvent, debounceInfo.fn);

                    this.debounceCheck[debounceEvent] = null;
                }
            }
        }
        this.debounceCheck = null;

        if (this.interval) {
            this.interval = clearInterval(this.interval);
        }
    }

    /**
     * Check if the element is within the visible viewport
     */
    check() {
        var el = this.node;
        var rect;
        var containmentRect;
        // if the component has rendered to null, dont update visibility
        if (!el) {
            return this.state;
        }

        rect = el.getBoundingClientRect();

        if (this.props.containment) {
            var containmentDOMRect = this.props.containment.getBoundingClientRect();
            containmentRect = {
                top: containmentDOMRect.top,
                left: containmentDOMRect.left,
                bottom: containmentDOMRect.bottom,
                right: containmentDOMRect.right,
            }
        } else {
            containmentRect = {
                top: 0,
                left: 0,
                bottom: window.innerHeight || document.documentElement.clientHeight,
                right: window.innerWidth || document.documentElement.clientWidth
            };
        }

        // Check if visibility is wanted via offset?
        var offset = this.props.offset || {};
        var hasValidOffset = typeof offset === 'object';
        if (hasValidOffset) {
            containmentRect.top += offset.top || 0;
            containmentRect.left += offset.left || 0;
            containmentRect.bottom -= offset.bottom || 0;
            containmentRect.right -= offset.right || 0;
        }

        var visibilityRect = {
            top: rect.top >= containmentRect.top,
            left: rect.left >= containmentRect.left,
            bottom: rect.bottom <= containmentRect.bottom,
            right: rect.right <= containmentRect.right
        };

        var isVisible = (
        visibilityRect.top && visibilityRect.left && visibilityRect.bottom && visibilityRect.right);

        // check for partial visibility
        if (this.props.partialVisibility) {
            var partialVisible = rect.top <= containmentRect.bottom && rect.bottom >= containmentRect.top && rect.left <= containmentRect.right && rect.right >= containmentRect.left;

            // account for partial visibility on a single edge
            if (typeof this.props.partialVisibility === 'string') {
                partialVisible = visibilityRect[this.props.partialVisibility]
            }

            // if we have minimum top visibility set by props, lets check, if it meets the passed value
            // so if for instance element is at least 200px in viewport, then show it.
            isVisible = this.props.minTopValue ? partialVisible && rect.top <= (containmentRect.bottom - this.props.minTopValue) : partialVisible
        }

        // Deprecated options for calculating offset.
        if (typeof offset.direction === 'string' && typeof offset.value === 'number') {
            console.warn('[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }', offset.direction, offset.value)

            isVisible = isVisibleWithOffset(offset, rect, containmentRect);
        }

        var state = this.state;
        // notify the parent when the value changes
        if (this.state.isVisible !== isVisible) {
            state = {
                isVisible: isVisible,
                visibilityRect: visibilityRect
            };
            this.setState(state);
            if (this.props.onChange) this.props.onChange(isVisible, visibilityRect);
        }

        return state;
    }

    render() {
        if (this.props.children instanceof Function) {
            return this.props.children({
                isVisible: this.state.isVisible,
                visibilityRect: this.state.visibilityRect,
            });
        }
        return React.Children.only(this.props.children);
    }

}

export default VisibilitySensor;

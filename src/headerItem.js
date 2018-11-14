/**
 * Sublime Tab Header Item
 */

const React = require('react');

const SublimeTabsHeaderItem extends React.Component {
    static get defaultProps() {
        return {
            width: null,
            title: '[Untitled Tab]',
            closable: true,
            unsaved: false,
            onClose: () => {}
        };
    }
    render() {
        const closeButton = closable ? (
            <span
                className="icon icon-cross close"
                onClick={this.props.onClose}>
            </span>
        ) : null;

        const unsavedIndicator = unsaved ? (
            <span
                className="icon unsaved indicator">
            </span>
        ) : null;

        const style = {
            width: `${this.props.width || 0}px`
        };

        return (
            <div
                className={`item ${this.props.className || ''}`}
                style={style}>
                <span
                    className="title">
                    {this.props.title || ''}
                </span>
                {unsavedIndicator}
                {closeButton}
            </div>
        );
    }
};

module.exports = SublimeTabsHeaderItem;

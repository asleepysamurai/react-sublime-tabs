/**
 * Sublime Tabs Tab Component
 */

const React = require('react');

function generateRandomId() {
    return Date.now().toString(36) + '-' + (Math.random() + 1).toString(36).substring(7);
};

const SublimeTabsTab extends React.Component {
    static get defaultProps() {
        return {
            title: '[Untitled Tab]',
            children: [],
            closable: true,
            unsaved: false,
            id: `tab-${generateRandomId()}`
        };
    }
    render() {
        return null;
    }
};

module.exports = SublimeTabsTab;

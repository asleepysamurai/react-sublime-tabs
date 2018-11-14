/**
 * Sublime Text 3 Style Tabs
 */

const React = require('react');

const SublimeTabsTab = require('./tab');
const SublimeTabsHeader = require('./header');

const SublimeTabs extends React.Component {
    static get defaultProps() {
        return {
            children: []
        };
    }
    render() {
        const tabs = this.props.children.filter(child => child instanceof SublimeTabsTab);

        const header = (
            <SublimeTabsHeader>
                {tabs}
            </SublimeTabsHeader>
        );

        const content = (
            <div
                key="content"
                className="content">
            </div>
        );

        const component = (
            <div
                className="sublime-tabs">
                {header}
                {content}
            </div>
        );
    }
};

module.exports = SublimeTabs;

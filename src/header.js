/**
 * Sublime Tabs Header Component
 */

const React = require('react');
const { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } = require('reactstrap');

const SublimeTabsHeaderItem = require('./headerItem');

const SublimeTabsHeader extends React.Component {
    constructor(props) {
        super(props);

        this.boundMethods = {
            onScrollStart: {
                left: this.onScrollStart.bind(this, 'left'),
                right: this.onScrollStart.bind(this, 'right')
            },
            onScrollEnd: this.onScrollEnd.bind(this),
            toggleScrollable: {
                scrollable: {
                    left: this.toggleScrollable.bind(this, true, 'left'),
                    right: this.toggleScrollable.bind(this, true, 'right')
                },
                unscrollable: {
                    left: this.toggleScrollable.bind(this, false, 'left'),
                    right: this.toggleScrollable.bind(this, false, 'right')
                }
            },
            onTabClose: {}
        };
    }
    static get defaultProps() {
        return {
            minTabWidth: 150,
            maxTabWidth: 300,
            tabClosable: true,
            containerWidth: null,
            children: [],
            tabScrollButtonsWidth: 40,
            tabListButtonWidth: 20
        };
    }
    calculateTabWidth() {
        const containerWidth = this.props.containerWidth || 0;
        const availableContainerWidth = containerWidth - (this.props.tabScrollButtonsWidth + this.props.tabListButtonWidth);
        const tabCount = this.props.children.length;
        const tabWidth = Math.floor(availableContainerWidth / tabCount);

        if (tabWidth < this.props.minTabWidth)
            return this.props.minTabWidth;
        if (tabWidth > this.props.maxTabWidth)
            return this.props.maxTabWidth;

        return tabWidth;
    }
    onScrollStart(direction) {
        // Should only scroll if cursor is over the button
    }
    onScrollEnd() {}
    toggleScrollable(scrollable, direction) {}
    onTabClose(tabId) {}
    renderTabScrollButtons() {
        return (
            <div
                className="btn btn-scroll">
                <span
                    className="icon icon-chevron-left"
                    onMouseEnter={this.boundMethods.toggleScrollable.scrollable.left}
                    onMouseLeave={this.boundMethods.toggleScrollable.unscrollable.left}
                    onMouseDown={this.boundMethods.onScrollStart.left}
                    onMouseUp={this.boundMethods.onScrollEnd} />
                <span
                    className="icon icon-chevron-right"
                    onMouseEnter={this.boundMethods.toggleScrollable.scrollable.right}
                    onMouseLeave={this.boundMethods.toggleScrollable.unscrollable.right}
                    onMouseDown={this.boundMethods.onScrollStart.right}
                    onMouseUp={this.boundMethods.onScrollEnd} />
            </div>
        );
    }
    renderTabListButton() {
        const menuItems = this.props.children(child => {
            return (
                <DropdownItem>
                    {child.title || ''}
                </DropdownItem>
            );
        });

        return (
            <div
                className="btn btn-list">
                <UncontrolledDropdown>
                    <DropdownToggle>
                        <span
                            className="icon icon-chevron-down" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        {menuItems}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
    render() {
        if (this.props.containerWidth === null)
            return null;

        const tabWidth = this.calculateTabWidth();

        const tabItems = this.props.children.map(child => {
            const { closable, unsaved, title } = child;

            this.boundMethods.onTabClose[child.id] = this.boundMethods.onTabClose[child.id] || this.onTabClose.bind(this, child.id);

            return (
                <SublimeTabsHeaderItem
                    width={tabWidth}
                    title={title}
                    closable={closable}
                    unsaved={unsaved}
                    onClose={this.boundMethods.onTabClose[child.id]} />
            );
        });

        const tabScrollButtons = this.renderTabScrollButtons();
        const tabListButton = this.renderTabListButton();

        return (
            <div
                className={`header ${this.props.className || ''}`}>
                {tabScrollButtons}
                {tabItems}
                {tabListButton}
            </div>
        );
    }
};

module.exports = SublimeTabsHeader;

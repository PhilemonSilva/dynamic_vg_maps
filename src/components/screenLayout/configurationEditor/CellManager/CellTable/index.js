import React from 'react';
import { Table, Input, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const CellTable = ({ text, ...props }) => {
    return <Table celled striped>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Solid</Table.HeaderCell>
                <Table.HeaderCell>Color</Table.HeaderCell>
                <Table.HeaderCell>Spawn Chance (%)</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
                <Table.Cell collapsing>
                    <Input
                        style={{maxWidth: 80}}
                        type='number'
                        value={1}
                    />
                </Table.Cell>
                <Table.Cell>Eusouumnome</Table.Cell>
                <Table.Cell collapsing textAlign='right'><Checkbox/></Table.Cell>
                <Table.Cell>cor</Table.Cell>
                <Table.Cell>90</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell collapsing>
                    <Input
                    style={{maxWidth: 80}}
                    type='number'
                    value={1}
                />
                </Table.Cell>
                <Table.Cell>Eusouumnome</Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    <Checkbox/>
                </Table.Cell>
                <Table.Cell>cor</Table.Cell>
                <Table.Cell>90</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
}

CellTable.propTypes = {
    text: PropTypes.string
}

CellTable.defaultProps = {
    text: ''
}

export default CellTable
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Popconfirm, Tag, Card } from 'antd';
import styled from 'styled-components'
import Logout from '../../../components/Logout'

const ActionButton = styled.span`
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const HeadWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1rem;
`

function User({ user }) {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/user/${user.id}/tickets`)
            .then(res => {
                const { tickets } = res.data;

                const parsedTickets = tickets.map((ticket, index) => {
                    return { key: index + 1, ticketId: ticket.id, isSelected: ticket.selected }
                })

                setTickets(parsedTickets)
            })
    })

    const handleEdit = (ticketId, isSelected) => {
        axios.patch(`http://localhost:4000/tickets/${ticketId}/selected`, { selected: isSelected === 1 ? 0 : 1 })
            .then(res => {
                const { status } = res
                if (status === 200) {
                    console.log('Data updated')
                }
            })
            .catch(() => {
                console.log('something is wrong')
            })
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Ticket ID',
            dataIndex: 'ticketId',
            key: 'ticketId',
        },
        {
            title: 'Selected',
            dataIndex: 'isSelected',
            key: 'isSelected',
            render: (text, record) =>
                tickets.length >= 1 ? (
                    <>
                        {record.isSelected ? <Tag color={'green'}>True</Tag> : null}
                    </>
                ) : null,
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) =>
                tickets.length >= 1 ? (
                    <Popconfirm title="Sure to edit?" onConfirm={() => handleEdit(record.ticketId, record.isSelected)}>
                        <ActionButton>Edit</ActionButton>
                    </Popconfirm>
                ) : null,
        },
    ]

    return (
        <Wrapper>
            <Card>
                <HeadWrapper>
                    <h2>
                        {'HEY ' + user.username.toUpperCase()}
                    </h2>
                    <Logout />
                </HeadWrapper>
                <Table columns={columns} dataSource={tickets} />
            </Card>
        </Wrapper>
    )
}

export default User
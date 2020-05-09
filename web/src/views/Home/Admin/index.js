import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, Select, Table, Popconfirm, Tag } from 'antd'
import Logout from '../../../components/Logout'
import axios from 'axios'

const { Option } = Select;

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
`

const ActionButton = styled.span`
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    margin-right: 1rem;
`

const CreateButton = styled.button`
    background-color: transparent;
`

const CreateWrapper = styled.div`
    display: flex;
`

function Admin({ user }) {
    const [users, setUsers] = useState([])
    const [userSelected, setUserSelected] = useState()
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/users`)
            .then(res => {
                const { users } = res.data;
                setUsers(users)
            })

        axios.get(`http://localhost:4000/ticketsbyuser`)
            .then(res => {
                const { tickets } = res.data;

                const parsedTickets = tickets.map((ticket, index) => {
                    return { key: index + 1, ticketId: ticket.id, username: ticket.username, isSelected: ticket.selected }
                })

                setTickets(parsedTickets)
            })

    }, [])

    const onUserSelectedChange = (value) => {
        setUserSelected(value)
    }

    const onCreateTicket = () => {
        if (userSelected) {
            axios.post('http://localhost:4000/tickets', { user_id: userSelected })
                .then(res => {
                    const { status } = res
                    if (status === 201) {
                        console.log('Ticket added successfully')
                        window.location.reload(false);
                    }
                })
                .catch(() => {
                    console.log('something is wrong')
                })
        }
    }

    const handleEdit = (ticketId, isSelected) => {
        axios.patch(`http://localhost:4000/tickets/${ticketId}/selected`, { selected: isSelected === 1 ? 0 : 1 })
            .then(res => {
                const { status } = res
                if (status === 200) {
                    console.log('Data updated');
                    window.location.reload(false);
                }
            })
            .catch(() => {
                console.log('something is wrong')
            })
    }

    const handleDelete = (ticketId) => {
        axios.delete(`http://localhost:4000/tickets/${ticketId}`)
            .then(res => {
                const { status } = res
                if (status === 200) {
                    console.log('Data deleted');
                    window.location.reload(false);
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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
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
                    <>
                        <Popconfirm title="Sure to edit?" onConfirm={() => handleEdit(record.ticketId, record.isSelected)}>
                            <ActionButton>Edit</ActionButton>
                        </Popconfirm>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.ticketId)}>
                            <ActionButton>Delete</ActionButton>
                        </Popconfirm>
                    </>
                ) : null,
        },
    ]

    return (
        <Wrapper>
            <Card style={{ width: 600 }}>
                <HeadWrapper>
                    <h2>
                        {'HEY ' + user.username.toUpperCase() + ' YOU ARE ADMIN'}
                    </h2>
                    <Logout />
                </HeadWrapper>
            </Card>
            <Card style={{ width: 600 }}>
                <h3>Create Ticket</h3>
                <CreateWrapper>
                    <Select style={{ width: 200 }} placeholder="Select an user" onChange={onUserSelectedChange}>
                        {users.map(user => {
                            return (
                                <Option key={user.id} value={user.id}>{user.username}</Option>
                            )
                        })}
                    </Select>
                    <CreateButton onClick={onCreateTicket}>Create</CreateButton>
                </CreateWrapper>
            </Card>
            <Card style={{ width: 600 }}>
                <Table columns={columns} dataSource={tickets} />
            </Card>
        </Wrapper>
    )
}

export default Admin
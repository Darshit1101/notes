import React, { useState } from 'react'
import {
    Page, Card, Button, Icon, InlineStack, Box, Modal, TextField, InlineGrid, Text, EmptyState, SkeletonBodyText, SkeletonDisplayText,
    BlockStack, Banner
} from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';

function TestingCard() {
    const [data, setData] = useState([]);
    const [text, setText] = useState('');

    const AddText = () => {
        if (!text) return
        setData([...data, text])
        setText('')
    }

    const deletetext = (index) => {
        setData(data.filter((_, i) => i !== index))
    }

    return (
        <div>
            TestingCard
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={AddText}>Add</button>

            {data.map((item, index) => (
                <div key={index}>
                    <div className='card'>
                        <div>{item}</div>
                        <button onClick={() => deletetext(index)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TestingCard;
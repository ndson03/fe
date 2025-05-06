import React from 'react';
import { Card, Row, Col } from 'antd';




export function AppContent({ selectedKey, onSelect, contentOptions }) {
    const selected = contentOptions.find(option => option.key === selectedKey);

    return (
        <Row gutter={[16, 16]}>
            {selected ? (
                <Col xs={24}>
                    {selected.content}
                </Col>
            ) : (
                contentOptions.map(option => (
                    <Col key={option.key} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            title={option.label}
                            bordered
                            style={{ textAlign: 'center' }}
                            onClick={ () => onSelect(option.key) } // Add this line to handle click
                        >
                            <div style={{ fontSize: 32 }}>{option.icon}</div>
                        </Card>
                    </Col>
                ))
            )}
        </Row>
    );
}
import React from 'react';
import { Card, Button } from 'antd';

export default function SavedFormsList({ savedForms, onSelectForm }) {
    return (
        <div>
            <h2>Saved Forms</h2>
            {savedForms.map((form, index) => (
                <Card key={index} title={`Form ${index + 1}`}>
                    {form}
                    <Button
                        type="primary"
                        style={{ marginTop: '10px' }}
                        onClick={() => onSelectForm(form)}
                    >
                        Open for Preview
                    </Button>
                </Card>
            ))}
        </div>
    );
}

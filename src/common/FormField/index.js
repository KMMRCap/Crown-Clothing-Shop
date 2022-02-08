import React from 'react';
import './form-input.styles.scss'
import { ErrorMessage, Field } from 'formik'

const FormField = (props) => {
    return (
        <div className='group'>
            <Field
                name={props.name}
                id={props.id}
                type={props.type}
                className='form-input'
                required
            />
            <div className='form-input-label'>
                {props.label ?
                    <label>
                        {props.label}
                    </label>
                    :
                    null
                }
                <span className='error'>
                    <ErrorMessage name={props.name} />
                </span>
            </div>
        </div>
    );
}

export default FormField;
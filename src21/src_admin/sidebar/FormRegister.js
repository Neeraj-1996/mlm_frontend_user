import { useForm } from 'react-hook-form';
// import MyLineChart from './Recharts';
import Recharts from './Recharts';
const FormRegister = () => { 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const errorMessageStyle = {
    color: 'red',
  };

  const submitButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="input-container">
      <input {...register('firstName')} 
       type="input"
       placeholder='First Name'
       style={inputStyle}/>
      </div>
      <div className="input-container">
      <input {...register('lastName', { required: true })} 
      type="input"
      placeholder='Last Name'
      style={inputStyle}/>
      {errors.lastName && <p>Last name is required.</p>}
      </div>
      <div className="input-container">

  
      <input {...register('age', { pattern: /\d+/ })}
       type="number"
       placeholder="Age" 
       style={inputStyle}/>
      {errors.age && <p>Please enter number for age.</p>}
     
      </div>

    <div className="input-container">
          <input
            {...register('mobileNumber', {
              required: 'Mobile number is required.',
            })}
            type="tel"
            placeholder="Mobile Number"
            style={inputStyle}
          />
          {errors.mobileNumber && (
            <p className="error-message">{errors.mobileNumber.message}</p>
          )}
        </div>

        <div className="input-container">
          <input
            {...register('password', { required: 'Password is required.' })}
            type="password"
            placeholder="Password"
            style={inputStyle}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <div className="input-container">
          <input
            {...register('confirmPassword', {
              required: 'Confirm Password is required.',
            })}
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>
        <input type="submit"  style={submitButtonStyle} />
        </form>




        {/* //REchart    */}
        <Recharts />
    </div>
  );
}

export default FormRegister;
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AcademyCard from '../components/AcademyCard'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../firebase'


function Academy(){

  const reload = ()=>{
    setTimeout(()=>{
      location.reload()

    }, 2000)
  }
  const[isFormVisible, setIsFormVisible]= useState(false)
  const toggleFormVisibility = ()=>{
    setIsFormVisible(!isFormVisible)
  }


  const [formData, setFormData] = useState({
    ParentName: "",
    contact: "",
    Email:"",
    telephone: " ",
    studentFullName: "",
    studentPhone: "",
    academyLevel: "",
    ageRange: "",
    country: "",
    state:"",
    courseLeve: "",
    course:""
  })
  const [fetchedData, setFetchedData] = useState([]); // State to hold fetched data
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [errorMessage, setErrormessage] = useState({
    ParentName: "",
    contact: "",
    Email:"",
    telephone: " ",
    studentFullName: "",
    studentPhone: "",
    academyLevel: "",
    ageRange: "",
    country: "",
    state:"",
    courseLeve: "",
    course:""
  })
  
  
    const Submit = async(e)=>{
     
        reload()
      e.preventDefault()
      if(ValidateForm()){
        // console.log('form submited', formData)

      }
      try {

         await addDoc(collection(db, "academy"), {
          ParentName: formData.ParentName,
        contact: formData.contact,
        Email: formData.Email,
        telephone: formData.telephone,
        studentFullName: formData.studentFullName,
        studentPhone: formData.studentPhone,
        academyLevel: formData.academyLevel,
        ageRange: formData.ageRange,
        country: formData.country,
        state: formData.state,
        courseLeve: formData.courseLeve,
        course: formData.course
        });
        // console.log("Document written with ID: ", docRef.id);
        // Clear the form after submission
      setFormData({
        ParentName: '',
      contact: '',
      Email: '',
      telephone: '',
      studentFullName: '',
      studentPhone: '',
      academyLevel: '',
      ageRange: '',
      country: '',
      state: '',
      courseLeve: '',
      course: ''
      });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      setIsSubmitted(true);

      // You can optionally reset the success message after a delay if needed
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000); // Reset the message after 3 seconds


    }

    const handleInputChange = (e)=>{
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      

    }

    const ValidateForm = ()=>{
      let valid = true
      const newErrors = {
        ParentName: '',
        contact: '',
        Email: '',
        telephone: '',
        studentFullName: '',
        studentPhone: '',
        academyLevel: '',
        ageRange: '',
        country: '',
        state: '',
        courseLeve: '',
        course: ''
      };

      if(formData.ParentName.trim() === ""){
        newErrors.ParentName = 'Parent name required'
        valid = false

      }
      if(formData.contact.trim() === ""){
        newErrors.contact = 'contact required'
        valid = false

      }
      if(formData.telephone.trim() === ""){
        newErrors.telephone = 'telephone required'
        valid = false
  
      }

      if(formData.studentFullName.trim() === ""){
        newErrors.studentFullName = 'student full name required'
        valid = false
  
      }

      if(formData.studentPhone.trim() === ""){
        newErrors.studentPhone = 'student phone required'
        valid = false
  
      }

      if(formData.academyLevel.trim() === ""){
        newErrors.academyLevel = 'academy required'
        valid = false
  
      }

      if(formData.ageRange.trim() === ""){
        newErrors.ageRange = 'age  required'
        valid = false
  
      }

      if(formData.country.trim() === ""){
        newErrors.country = 'country required'
        valid = false
  
      }
      if(formData.state.trim() === ""){
        newErrors.state = 'state required'
        valid = false
  
      }

      if(formData.courseLeve.trim() === ""){
        newErrors.courseLeve = 'course Level required'
        valid = false
  
      }
      if(formData.course.trim() === ""){
        newErrors.course = 'course required'
        valid = false
  
      }

      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.Email)) {
        newErrors.Email = 'Invalid email format';
        valid = false;
      }
      setErrormessage(newErrors)
      return valid

    }

    

  












    return(
      <div>
        <AcademyCard />
        <div className='flex justify-center items-center m-10'><i>Click on this button to register with us</i></div>
        <div className='flex justify-center items-center m-4'>
        <button onClick={toggleFormVisibility} className="mx-8 bg-adainyellow text-white px-4 py-2 rounded font-popins">
        {isFormVisible ? 'Hide form': 'Show form'}

         </button>
         </div>

        {isFormVisible && (
            <div>
                 <form onSubmit={Submit} method='post'className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
       <div className="mb-4">
       <label className="block text-gray-700 text-sm font-bold mb-2" for="parent name">
        Parent's name
      </label>
      <input 
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name" 
              type="text" 
              defaultValue={formData.ParentName}
              onChange={handleInputChange}
              name='ParentName'
              placeholder="parent fullname"/>
              <p>{errorMessage.ParentName}</p>
    </div>
    <div className='mb-6'>
      <label className='block text-gray-700 text-sm font-bold mb-2'>Contact</label>
      <input 
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="grid-last-name" 
              defaultValue={formData.contact}
              onChange={handleInputChange}
              type="text" 
              name='contact'
              placeholder="Contact address"/>
              <p>{errorMessage.contact}</p>

    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
      name='Email'
      required
      onChange={handleInputChange}
      defaultValue={formData.Email}
      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="email" placeholder="Email"/>
      <p className='text-adainyellow'>{errorMessage.Email}</p>
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Telephone
      </label>

      <input 
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              defaultValue={formData.telephone}
              onChange={handleInputChange}
              type="text" 
              name='telephone'
              placeholder="telephone"/>
              <p>{errorMessage.telephone}</p>

    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="student fullname">
      Student's fullname
      </label>

      <input 
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              defaultValue={formData.studentFullName}
              onChange={handleInputChange}
              type="text" 
              name='studentFullName'
              placeholder="student fullname"/>
              <p>{errorMessage.studentFullName}</p>

    </div>


    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="student phone">
      Student's phone
      </label>

      <input 
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              defaultValue={formData.studentPhone}
              onChange={handleInputChange}
              type="text" 
              name='studentPhone'
              placeholder="student phone"/>
              <p>{errorMessage.studentPhone}</p>

    </div>


    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="Academy level">
      Academy level
      </label>

      <select 
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="academyLevel"
              defaultValue={formData.academyLevel}
              onChange={handleInputChange}
              id="academyLevel">
              <option value="">select highest academy level &hellip;</option>
              <option value="none">None</option>
              <option value="Bsc">BSC</option>
              <option value="Msc">MSC</option>
              <option value="Diploma">Diploma</option>
              <option value="Doctorate(PHD)">Doctorate(PHD)</option>
              <option value="High School/ Secondary School">High school/ Secondary school</option>
              <option value="Under graduate">Under Graduate</option>
              <option value="Junior/ Middle school">Junior/ Middle school</option>
              <option value="Post Graduate">Post Graduate</option>
              </select>
              <p>{errorMessage.academyLevel}</p>

    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="Age range">
      Age range
      </label>
      <select 
              defaultValue={formData.ageRange}
              onChange={handleInputChange}
              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              name="ageRange" id="ageRange">
              <option value="">select your age range &hellip;</option>
              <option value="18-24">18-24</option>
              <option value="25-29">25-29</option>
              <option value="30-39">30-39</option>
              <option value="40-50">40-50</option>
              <option value="50+">50+</option>

              </select>
              <p>{errorMessage.ageRange}</p>

      

    </div>


    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="country">
      Country
      </label>
      <select 

              className="mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="country"
              defaultValue={formData.country}
              onChange={handleInputChange}
              name="country">
              <option>select country</option>
              <option  value="AF">Afghanistan</option>
              <option value="AX">Aland Islands</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AS">American Samoa</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antarctica</option>
              <option value="AG">Antigua and Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermuda</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BV">Bouvet Island</option>
              <option value="BR">Brazil</option>
              <option value="IO">British Indian Ocean Territory</option>
              <option value="BN">Brunei Darussalam</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="KY">Cayman Islands</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CX">Christmas Island</option>
              <option value="CC">Cocos (Keeling) Islands</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo</option>
              <option value="CD">Congo, Democratic Republic of the Congo</option>
              <option value="CK">Cook Islands</option>
              <option value="CR">Costa Rica</option>
              <option value="CI">Cote D'Ivoire</option>
              <option value="HR">Croatia</option>
              <option value="CU">Cuba</option>
              <option value="CW">Curacao</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="GQ">Equatorial Guinea</option>
              <option value="ER">Eritrea</option>
              <option value="EE">Estonia</option>
              <option value="ET">Ethiopia</option>
              <option value="FK">Falkland Islands (Malvinas)</option>
              <option value="FO">Faroe Islands</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GF">French Guiana</option>
              <option value="PF">French Polynesia</option>
              <option value="TF">French Southern Territories</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GI">Gibraltar</option>
              <option value="GR">Greece</option>
              <option value="GL">Greenland</option>
              <option value="GD">Grenada</option>
              <option value="GP">Guadeloupe</option>
              <option value="GU">Guam</option>
              <option value="GT">Guatemala</option>
              <option value="GG">Guernsey</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bissau</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HM">Heard Island and Mcdonald Islands</option>
              <option value="VA">Holy See (Vatican City State)</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran, Islamic Republic of</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IM">Isle of Man</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JE">Jersey</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KP">Korea, Democratic People's Republic of</option>
              <option value="KR">Korea, Republic of</option>
              <option value="XK">Kosovo</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Lao People's Democratic Republic</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libyan Arab Jamahiriya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MO">Macao</option>
              <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MQ">Martinique</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="YT">Mayotte</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia, Federated States of</option>
              <option value="MD">Moldova, Republic of</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MS">Montserrat</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="AN">Netherlands Antilles</option>
              <option value="NC">New Caledonia</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NU">Niue</option>
              <option value="NF">Norfolk Island</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestinian Territory, Occupied</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PN">Pitcairn</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="PR">Puerto Rico</option>
              <option value="QA">Qatar</option>
              <option value="RE">Reunion</option>
              <option value="RO">Romania</option>
              <option value="RU">Russian Federation</option>
              <option value="RW">Rwanda</option>
              <option value="BL">Saint Barthelemy</option>
              <option value="SH">Saint Helena</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="MF">Saint Martin</option>
              <option value="PM">Saint Pierre and Miquelon</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="ST">Sao Tome and Principe</option>
              <option value="SA">Saudi Arabia</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="CS">Serbia and Montenegro</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leone</option>
              <option value="SG">Singapore</option>
              <option value="SX">Sint Maarten</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="SB">Solomon Islands</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="GS">South Georgia and the South Sandwich Islands</option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SJ">Svalbard and Jan Mayen</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="SY">Syrian Arab Republic</option>
              <option value="TW">Taiwan, Province of China</option>
              <option value="TJ">Tajikistan</option>
              <option value="TZ">Tanzania, United Republic of</option>
              <option value="TH">Thailand</option>
              <option value="TL">Timor-Leste</option>
              <option value="TG">Togo</option>
              <option value="TK">Tokelau</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad and Tobago</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="TM">Turkmenistan</option>
              <option value="TC">Turks and Caicos Islands</option>
              <option value="TV">Tuvalu</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="UM">United States Minor Outlying Islands</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistan</option>
              <option value="VU">Vanuatu</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Viet Nam</option>
              <option value="VG">Virgin Islands, British</option>
              <option value="VI">Virgin Islands, U.s.</option>
              <option value="WF">Wallis and Futuna</option>
              <option value="EH">Western Sahara</option>
              <option value="YE">Yemen</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
              </select>
              <p>{errorMessage.country}</p>

      

    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="state">
      State
      </label>

      <select
      name='state'
              defaultValue={formData.state}
              onChange={handleInputChange}
className='mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>              <option >Select state</option>
              <option value="Abia">Abia State</option>
              <option value="Adamawa">Adamawa State</option>
              <option value="Akwa Ibom">Akwa Ibom State</option>
              <option value="Anambra">Anambra State</option>
              <option value="Bauchi">Bauchi State</option>
              <option value="Bayelsa">Bayelsa State</option>
              <option value="Benue">Benue State</option>
              <option value="Borno">Borno State</option>
              <option value="Cross River">Cross River State</option>
              <option value="Delta">Delta State</option>
              <option value="Ebonyi">Ebonyi State</option>
              <option value="Edo">Edo State</option>
              <option value="Ekiti">Ekiti State</option>
              <option value="Enugu">Enugu State</option>
              <option value="FCT">Federal Capital Territory</option>
              <option value="Gombe">Gombe State</option>
              <option value="Imo">Imo State</option>
              <option value="Jigawa">Jigawa State</option>
              <option value="Kaduna">Kaduna State</option>
              <option value="Kano">Kano State</option>
              <option value="Katsina">Katsina State</option>
              <option value="Kebbi">Kebbi State</option>
              <option value="Kogi">Kogi State</option>
              <option value="Kwara">Kwara State</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa State</option>
              <option value="Niger">Niger State</option>
              <option value="Ogun">Ogun State</option>
              <option value="Ondo">Ondo State</option>
              <option value="Osun">Osun State</option>
              <option value="Oyo">Oyo State</option>
              <option value="Plateau">Plateau State</option>
              <option value="Sokoto">Sokoto State</option>
              <option value="Taraba">Taraba State</option>
              <option value="Yobe">Yobe State</option>
              <option value="Zamfara">Zamfara State</option>
              </select>
              <p>{errorMessage.state}</p>

      

    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="courselevel">
      Course level
      </label>

      <select
              defaultValue={formData.courseLeve}
              onChange={handleInputChange}
              name='courseLeve'
className='mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>              <option > course level &hellip;</option>
              <option value="entry level">Entry Level</option>
              <option value="diploma level">Diploma level</option>


              </select>

     
              <p>{errorMessage.courseLeve}</p>

      

    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="courselevel">
      Course of interest
      </label>

      <select
              defaultValue={formData.course}
              name='course'
              onChange={handleInputChange}
className='mt-4 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>              <option > Select Course of interest &hellip;</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Front End">FrontEnd</option>
              <option value="Backend">BackEnd</option>
              <option value="Fullstack">Fullstack</option>
              <option value="MobileApp">MobileApp Development</option>

              </select>

     
              <p>{errorMessage.course}</p>

      

    </div>


    


  


    <div className="flex items-center justify-center">
      <button className="mx-8 bg-adainyellow text-white px-4 py-2 rounded font-popins" type="submit">
        Submit
      </button>

      

      
    </div>
                 </form>
            </div>
              
        )}
       
        {/**div for whatsapp contact */}
        <div className="elfsight-app-597fb779-735d-41ae-a417-35c199b9ebc6"></div>
        
      </div>
    )
}

export default Academy
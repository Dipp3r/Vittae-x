import React from "react"

class EmailComp extends React.Component {
    constructor(){

    }
    render(){


        return(<section className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 pt-20 pb-20 p-6">
        <div className="bg-white max-w-sm rounded-2xl w-full shadow-2xl">
            <div className="p-8 pt-4 pb-4">
                <p className="heading text-Text_blue text-xl">ENTER OTP</p>
                <p className="text-sm mt-2">An OTP is sent to your email</p>
                <p id="samplephone" className="text-Text_blue text-sm">example123@gmail.com</p>
            </div>
            <div>
                <div className="bg-white m-8 mt-0 mb-0 rounded-b-xl">
                    
                    <div className="flex flex-row gap-x-5 justify-center mt-6">
                        <input type="number" maxlength="1" className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        <input type="number" maxlength="1" className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        <input type="number" maxlength="1" className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        <input type="number" maxlength="1" className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        
                        {/* <script>
                            document.querySelectorAll('input[type="number"]').forEach(input =>{
                                input.oninput = () =>{
                                    let max =input.maxLength;
                                    if(input.value.length > max) input.value = input.value.slice(0,max);
                                };
                            });
                        </script> */}
                        
                    </div>
                    <p className="float-right mr-12 mt-1 text-sm text-border_gray">00:00 <a className="underline text-Text_blue">Resend</a></p>
                    
    
                    <div className="pl-2 mt-14 text-center">
                        <label for="remember_me" className="text-Text_blue underline"> Try using mobile </label>
                    </div>
                    
                    <div className="mt-2 mb-10">
                        <button id="button" type="submit" className="bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 shadow-xl rounded-xl">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>          
        </div>
    </section>
    
    
    
    )
    }
}

export default EmailComp
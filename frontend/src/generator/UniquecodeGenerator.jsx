import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user.context';

const UniquecodeGenerator = () => {
    const { codeGenerated, setCodeGenerated } = useUserContext();
    const [generatedCode, setGeneratedCode] = useState('');

    function generateCode(inputLength) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < inputLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCodeGenerated(true);
        return result;
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newCode = generateCode(8);
            setGeneratedCode(newCode);
        }, 1000);

        return () => {
            clearTimeout(timeout)
            setCodeGenerated(false);}; // Cleanup timeout on unmount
    }, [setCodeGenerated]);

    function formatCode(code) {
        return code.split('').map((char, index) => {
            return <span key={index} className="text-[1.3rem] border border-black px-3.5 py-2 rounded m-1 bg-white">{char}</span>;
        });
    }

    function generateContent() {
        if (!codeGenerated) {
            return (
                <svg
                    className="animate-spin h-20 w-20"
                    fill="none"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 3C6.13401 3 3 6.13401 3 10C3 10.2761 2.77614 10.5 2.5 10.5C2.22386 10.5 2 10.2761 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5C9.5 17.2239 9.72386 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
                        fill="#D1D7DB"
                    />
                </svg>
            );
        }

        return <p>{formatCode(generatedCode.slice(0, 4))} <span className='font-black'>-</span> {formatCode(generatedCode.slice(4, 8))}</p>;
    }

    return (
        <div className="flex items-center justify-center h-full w-full select-none">
            {generateContent()}
        </div>
    );
};

export default UniquecodeGenerator;
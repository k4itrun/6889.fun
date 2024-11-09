import { ErrorProps, Errors } from "@/interfaces";
import { metaConfig } from "@k4itrunconfig";

import { NextPageContext } from 'next';

function Error({ statusCode }: ErrorProps) {
    const errors: Errors = metaConfig.errors;

    return (
        <>
            <div className="flex flex-col items-center justify-center py-56">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-white">{statusCode}</h1>
                <p className="text-2xl text-gray-500 dark:text-gray-500">
                    {errors[statusCode]}
                </p>
            </div>
        </>
    );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;

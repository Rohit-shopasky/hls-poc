export interface IBucketArgs {
    localDir: string;
    deleteRemoved: boolean;
    s3Params: {
        Bucket: string;
        Prefix: string;
    };
}

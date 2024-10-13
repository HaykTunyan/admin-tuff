import {Box, BoxProps} from "@mui/material";

export const SanitizedBox = ({ fullWidth, basePath, ...props }: BoxProps & { fullWidth?: boolean; basePath?: string }) => <Box {...props} />;

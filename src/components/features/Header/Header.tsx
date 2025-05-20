import Logo from '@/components/common/Logo';
import Navigation from '@/components/common/Navigation/Navigation';
import GroupButtonHeader from '@/components/features/Header/GroupButtonHeader';
import Wrapper from '@/components/layout/Wrapper';
import { Box } from '@mui/material';
interface Props {
    isHiddenGroupButtonHeader?: boolean;
    isHiddenNavbar?: boolean;
}
export default function Header(props: Props) {
    const { isHiddenGroupButtonHeader = false } = props;
    return (
        <Box sx={{ background: 'white' }}>
            <Wrapper>
                <Box
                    sx={{
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Logo />
                    </Box>
                    <Box
                        sx={{
                            visibility: props.isHiddenNavbar
                                ? 'hidden'
                                : 'visible',
                        }}
                    >
                        <Navigation />
                    </Box>
                    <Box
                        sx={{
                            visibility: isHiddenGroupButtonHeader
                                ? 'hidden'
                                : 'visible',
                        }}
                    >
                        <GroupButtonHeader />
                    </Box>
                </Box>
            </Wrapper>
        </Box>
    );
}

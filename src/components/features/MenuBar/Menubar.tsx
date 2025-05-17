import SearchBar from '@/components/features/MenuBar/SearchBar';
import Slider from '@/components/features/Slider/Slider';
import Wrapper from '@/components/layout/Wrapper';
import { CategoryTypeEnum } from '@/constans/category';
import categoryService from '@/services/categoryService';
import { Box } from '@mui/material';
interface Props {
    typeCategory: CategoryTypeEnum;
}
export default async function MenuBar(props: Props) {
    const listCategories = await categoryService.getCategories(
        props.typeCategory
    );
    console.log(props.typeCategory);
    return (
        <Box>
            <Wrapper>
                <Box>
                    <SearchBar />
                </Box>
            </Wrapper>
            <Box
                sx={{
                    width: '1280px',

                    margin: '0 auto',
                    marginTop: '14px',
                    marginBottom: '14px',
                }}
            >
                <Slider menuItems={listCategories} />
            </Box>
        </Box>
    );
}

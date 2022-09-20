import {NextPage} from "next";
import {MainLayout} from "../layouts/MainLayout";
import {WriteForm} from "../components/WriteForm/WriteForm";

type WritePagePropsType = {

}

const WritePage: NextPage<WritePagePropsType> = () => {
   return (
      <MainLayout className='main-layout-white' hideComments hideMenu>
         <WriteForm/>
      </MainLayout>

   );
};

export default WritePage

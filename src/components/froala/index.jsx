


import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/font_size.min';
import 'froala-editor/js/plugins/colors.min';
import 'froala-editor/js/plugins/align.min';
import 'froala-editor/js/plugins/lists.min';
import 'froala-editor/js/plugins/fullscreen.min';


import FroalaEditor from 'react-froala-wysiwyg';

const MyFroalaEditor = ({model, setDesc}) => {
  return <FroalaEditor model={model} onModelChange={(e)=>setDesc(e)}/>;
};

export default MyFroalaEditor;
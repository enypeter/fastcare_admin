import {Download, X} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {useState, ChangeEvent} from 'react';
import Success from '../../../features/modules/dashboard/success';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/services/store';
import {createArticles} from '@/services/thunks';

export default function AddArticle() {
  const dispatch = useDispatch<AppDispatch>();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  // form state
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Body', body);
    formData.append('Tag', tag);
    if (image) {
      formData.append('Image', image);
    }

    try {
      await dispatch(createArticles(formData)).unwrap();
      setOpenSuccess(true);

      // clear fields after success
      setTitle('');
      setTag('');
      setBody('');
      setImage(null);
      setImagePreview(null);
      setOpen(false);
    } catch (err) {
      console.error('Failed to create article:', err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Add new article</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[600px] overflow-y-auto"
      >
        <SheetHeader className="flex w-full items-center justify-between border-b pb-2">
          <SheetTitle className="flex w-full items-center justify-between">
            <span className="text-gray-800 text-2xl font-normal">
              Add New Article
            </span>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="text-gray-800">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-2 outline-none"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="text-gray-800">Tag</label>
            <input
              value={tag}
              onChange={e => setTag(e.target.value)}
              className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-2 outline-none"
            />
          </div>

          {/* Image Upload with Preview */}
          <div>
            <label className="text-gray-800">Image (optional)</label>

            <div className="mt-2 border-2 border-dashed border-primary rounded-lg w-full py-6 flex flex-col items-center justify-center text-center cursor-pointer transition relative">
              {!imagePreview ? (
                <>
                  <Download className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-4 font-medium text-lg text-gray-700">
                    Drag and Drop to upload photo
                  </p>
                  <p className="text-lg text-gray-700">
                    or{' '}
                    <label
                      htmlFor="photo-upload"
                      className="text-primary font-semibold cursor-pointer"
                    >
                      browse
                    </label>{' '}
                    to select PNG/JPEG file
                  </p>
                </>
              ) : (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg max-h-64 mx-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              )}
            </div>

            {/* File input (kept outside) */}
            <input
              id="photo-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-gray-800">Body</label>
            <textarea
              rows={6}
              value={body}
              onChange={e => setBody(e.target.value)}
              className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-2 outline-none"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Publish
          </Button>
        </div>
      </SheetContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully submitted this article"
      />
    </Sheet>
  );
}

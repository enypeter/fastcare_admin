import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeOffIcon, EyeOpenIcon } from '@/components/ui/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  email: z.string().email({ message: 'Email address is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  remember: z.boolean().optional(),
});

const ForgetPaswword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: values.email,
      password: values.password,
      remember: values.remember,
    };

    navigate('/home');
    console.log('Form submitted with values:', payload);
  }

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex flex-col items-center justify-center">
      {/* Logo outside the card */}
      <div className="flex justify-center w-full">
        <img src="/images/fulllogo.png" className="w-44" />
      </div>

      {/* White card */}
      <div className="bg-white rounded-lg w-[90%] max-w-lg px-14 py-12 flex flex-col items-center mt-10 shadow-sm">
        <h2 className="text-2xl font-medium text-primary text-center mb-12">
          LOGIN
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-8"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="Email"
                      className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                           id="password"
                          {...field}
                           label="Password"
                          type={!showPassword ? 'password' : 'text'}
                          placeholder="Password"
                          className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? (
                            <EyeOpenIcon className="w-5 h-5 text-neutral-900" />
                          ) : (
                            <EyeOffIcon className="w-5 h-5 text-neutral-900" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me */}
              <div className="flex items-center justify-between text-md mt-4">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({field}) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="w-5 h-5 mt-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <label className="text-gray-900 ">Remember me</label>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Log in
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm mt-3">
          <p>
            <span
              className="font-medium cursor-pointer text-[16px]"
              onClick={() => navigate('/auth/create-account')}
            >
              Forgot your password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPaswword;

import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const content = {
  en: {
    steps: ['Contact', 'Your Goal', 'Your Level'],
    fields: {
      name: { label: 'Full Name', placeholder: 'e.g., Alex Doe' },
      email: { label: 'Email Address', placeholder: 'alex.doe@example.com' },
      mainGoal: { label: 'Primary Goal', options: ['Finish the marathon', 'Achieve a time goal', 'Enjoy the experience'] },
      marathonDate: { label: 'Target Marathon Date' },
      experienceLevel: { label: 'What is your current level?', options: ['Beginner (Just starting)', 'Intermediate (I run regularly)', 'Advanced (I have experience in races)'] },
      consent: { label: 'I consent to the processing of my data and to be contacted by email.' }
    },
    buttons: { next: 'Next', back: 'Back', submit: 'Build My Plan' },
    errors: {
      required: 'This field is required',
      email: 'Please enter a valid email',
      number: 'Please enter a valid number',
      minAge: 'You must be at least 18 years old',
      minDays: 'Select at least two training days',
      consent: 'You must accept to continue',
    }
  },
  es: {
    steps: ['Contacto', 'Tu Meta', 'Tu Nivel'],
    fields: {
        name: { label: 'Nombre Completo', placeholder: 'Ej: Alex García' },
        email: { label: 'Correo Electrónico', placeholder: 'alex.garcia@example.com' },
        mainGoal: { label: 'Objetivo Principal', options: ['Terminar la maratón', 'Lograr un tiempo objetivo', 'Disfrutar la experiencia'] },
        marathonDate: { label: 'Fecha de la Maratón Objetivo' },
        experienceLevel: { label: '¿Cuál es tu nivel actual?', options: ['Principiante (Estoy empezando)', 'Intermedio (Corro regularmente)', 'Avanzado (Tengo experiencia en carreras)'] },
        consent: { label: 'Acepto el tratamiento de mis datos y ser contactado por email.' }
    },
    buttons: { next: 'Siguiente', back: 'Atrás', submit: 'Crear Mi Plan' },
    errors: {
      required: 'Este campo es obligatorio',
      email: 'Por favor, ingresa un email válido',
      number: 'Ingresa un número válido',
      minAge: 'Debes tener al menos 18 años',
      minDays: 'Selecciona al menos dos días de entrenamiento',
      consent: 'Debes aceptar para continuar',
    }
  }
};

const createFormSchema = (t: typeof content.en) => z.object({
  name: z.string().min(1, t.errors.required),
  email: z.string().email(t.errors.email),
  mainGoal: z.string({ required_error: t.errors.required }),
  marathonDate: z.string({ required_error: t.errors.required }).min(1, t.errors.required),
  experienceLevel: z.string({ required_error: t.errors.required }),
  consent: z.boolean().refine(val => val === true, { message: t.errors.consent }),
});

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

interface MultiStepPlanFormProps {
  language: 'en' | 'es';
  onSubmit: SubmitHandler<FormValues>;
}

const MultiStepPlanForm: React.FC<MultiStepPlanFormProps> = ({ language, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const t = content[language];
  const formSchema = createFormSchema(t);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      consent: false,
    }
  });

  const handleNextStep = async () => {
    const fieldsPerStep: (keyof FormValues)[][] = [
      ['name', 'email'],
      ['mainGoal', 'marathonDate'],
      ['experienceLevel', 'consent']
    ];
    const isValid = await trigger(fieldsPerStep[currentStep]);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const Input = ({ name, label, placeholder, type = 'text' }: { name: keyof FormValues, label: string, placeholder: string, type?: string }) => (
    <div className="mb-6">
      <Label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">{label}</Label>
      <input {...register(name)} id={name} type={type} placeholder={placeholder} className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
      {errors[name] && <p className="text-red-400 text-xs mt-2">{errors[name]?.message}</p>}
    </div>
  );

  const RadioGroupField = ({ name, label, options }: { name: keyof FormValues, label: string, options: string[] }) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-300 mb-2">{label}</Label>
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value as string} className="flex flex-col space-y-2">
            {options.map(opt => (
              <div key={opt} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${name}-${opt}`} />
                <Label htmlFor={`${name}-${opt}`} className="text-gray-300 font-normal">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors[name] && <p className="text-red-400 text-xs mt-2">{errors[name]?.message}</p>}
        </div>
      )}
    />
  );

  const CheckboxGroupField = ({ name, label, options }: { name: keyof FormValues, label: string, options: string[] }) => (
    <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-300 mb-2">{label}</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {options.map(opt => (
                <Controller
                    key={opt}
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id={`${name}-${opt}`}
                                onCheckedChange={(checked) => {
                                    const currentValues = Array.isArray(field.value) ? field.value : [];
                                    if (checked) {
                                        field.onChange([...currentValues, opt]);
                                    } else {
                                        field.onChange(currentValues.filter((v: string) => v !== opt));
                                    }
                                }}
                                checked={Array.isArray(field.value) ? field.value.includes(opt) : false}
                            />
                            <Label htmlFor={`${name}-${opt}`} className="text-gray-300 font-normal">{opt}</Label>
                        </div>
                    )}
                />
            ))}
        </div>
        {errors[name] && <p className="text-red-400 text-xs mt-2">{errors[name]?.message}</p>}
    </div>
  );

  const TextareaField = ({ name, label, placeholder }: { name: keyof FormValues, label: string, placeholder: string }) => (
    <div className="mb-6">
        <Label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">{label}</Label>
        <textarea {...register(name)} id={name} placeholder={placeholder} rows={4} className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors[name] && <p className="text-red-400 text-xs mt-2">{errors[name]?.message}</p>}
    </div>
  );

  const SingleCheckbox = ({ name, label }: { name: keyof FormValues, label: string }) => (
      <Controller
          name={name}
          control={control}
          render={({ field }) => (
              <div className="mb-6">
                  <div className="flex items-start space-x-2">
                      <Checkbox id={name} checked={!!field.value} onCheckedChange={field.onChange} />
                      <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={name} className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {label}
                          </Label>
                      </div>
                  </div>
                  {errors[name] && <p className="text-red-400 text-xs mt-2">{errors[name]?.message}</p>}
              </div>
          )}
      />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-8 flex justify-center items-center space-x-2 md:space-x-4">
        {t.steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex items-center ${index <= currentStep ? 'text-purple-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index <= currentStep ? 'border-purple-400 bg-purple-400/20' : 'border-gray-600'}`}>
                {index + 1}
              </div>
            </div>
            {index < t.steps.length - 1 && <div className={`w-6 h-0.5 md:w-10 ${index < currentStep ? 'bg-purple-400' : 'bg-gray-600'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
        <Input name="name" label={t.fields.name.label} placeholder={t.fields.name.placeholder} />
        <Input name="email" label={t.fields.email.label} placeholder={t.fields.email.placeholder} type="email" />
      </div>

      <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
        <RadioGroupField name="mainGoal" label={t.fields.mainGoal.label} options={t.fields.mainGoal.options} />
        <Input name="marathonDate" label={t.fields.marathonDate.label} type="date" placeholder="" />
      </div>

      <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
        <RadioGroupField name="experienceLevel" label={t.fields.experienceLevel.label} options={t.fields.experienceLevel.options} />
        <SingleCheckbox name="consent" label={t.fields.consent.label} />
      </div>

      <div className="mt-8 flex justify-between items-center">
        {currentStep > 0 ? (
          <button type="button" onClick={handlePrevStep} className="flex items-center px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white bg-neutral-800 rounded-lg transition">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t.buttons.back}
          </button>
        ) : <div />} 

        {currentStep < t.steps.length - 1 ? (
          <button type="button" onClick={handleNextStep} className="flex items-center px-6 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition">
            {t.buttons.next} <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button type="submit" className="flex items-center px-6 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition">
            {t.buttons.submit}
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepPlanForm;

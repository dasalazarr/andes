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
    steps: ['Profile', 'Experience', 'Goals', 'Final Details'],
    fields: {
      name: { label: 'Full Name', placeholder: 'e.g., Alex Doe' },
      email: { label: 'Email Address', placeholder: 'alex.doe@example.com' },
      age: { label: 'Age', placeholder: 'e.g., 30' },
      gender: { label: 'Gender', options: ['Male', 'Female', 'Prefer not to say', 'Other'] },
      experience: { label: 'Running Experience', options: ['Never run before', 'Less than 6 months', '6 months - 1 year', '1-3 years', 'More than 3 years'] },
      longestDistance: { label: 'Longest distance in last 3 months', options: ['< 5 km', '5-10 km', '10-21 km (Half Marathon)', '> 21 km (Marathon)'] },
      weeklyVolume: { label: 'Current weekly volume (km)', options: ['0-10 km', '11-25 km', '26-40 km', '> 40 km'] },
      marathonDate: { label: 'Target Marathon Date' },
      mainGoal: { label: 'Primary Goal', options: ['Finish the marathon', 'Achieve a time goal', 'Enjoy the experience', 'Other'] },
      otherGoal: { label: 'Specify other goal', placeholder: 'Please specify your goal' },
      trainingDays: { label: 'Which days can you train?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      gymAccess: { label: 'Do you have gym access?' },
      currentInjury: { label: 'Current or recent injuries', options: ['None', 'Mild (occasional pain)', 'Moderate', 'Severe / In rehabilitation'] },
      injuryDetails: { label: 'Please provide details about your injuries', placeholder: 'Describe the injury, location, and status...' },
      sleepHours: { label: 'Average hours of sleep', options: ['< 6 hours', '6-7 hours', '7-8 hours', '> 8 hours'] },
      stressLevel: { label: 'Average stress level', options: ['Low', 'Medium', 'High'] },
      additionalInfo: { label: 'Anything else we should know?', placeholder: 'Tell us about your nutrition, previous plans, etc.' },
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
    steps: ['Perfil', 'Experiencia', 'Metas', 'Detalles Finales'],
    fields: {
        name: { label: 'Nombre Completo', placeholder: 'Ej: Alex García' },
        email: { label: 'Correo Electrónico', placeholder: 'alex.garcia@example.com' },
        age: { label: 'Edad', placeholder: 'Ej: 30' },
        gender: { label: 'Género', options: ['Hombre', 'Mujer', 'Prefiero no decir', 'Otro'] },
        experience: { label: 'Experiencia corriendo', options: ['Nunca he corrido', 'Menos de 6 meses', '6 meses - 1 año', '1-3 años', 'Más de 3 años'] },
        longestDistance: { label: 'Distancia más larga en los últimos 3 meses', options: ['< 5 km', '5-10 km', '10-21 km (Media Maratón)', '> 21 km (Maratón)'] },
        weeklyVolume: { label: 'Volumen semanal actual (km)', options: ['0-10 km', '11-25 km', '26-40 km', '> 40 km'] },
        marathonDate: { label: 'Fecha de la Maratón Objetivo' },
        mainGoal: { label: 'Objetivo Principal', options: ['Terminar la maratón', 'Lograr un tiempo objetivo', 'Disfrutar la experiencia', 'Otro'] },
      otherGoal: { label: 'Especifica otro objetivo', placeholder: 'Por favor, especifica tu objetivo' },
      trainingDays: { label: '¿Qué días puedes entrenar?', options: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] },
      gymAccess: { label: '¿Tienes acceso a un gimnasio?' },
        currentInjury: { label: 'Lesiones actuales o recientes', options: ['Ninguna', 'Leve (dolor ocasional)', 'Moderada', 'Grave / En rehabilitación'] },
        injuryDetails: { label: 'Por favor, da detalles de tus lesiones', placeholder: 'Describe la lesión, ubicación y estado...' },
        sleepHours: { label: 'Horas de sueño promedio', options: ['< 6 horas', '6-7 horas', '7-8 horas', '> 8 horas'] },
        stressLevel: { label: 'Nivel de estrés promedio', options: ['Bajo', 'Medio', 'Alto'] },
        additionalInfo: { label: '¿Algo más que debamos saber?', placeholder: 'Cuéntanos sobre tu nutrición, planes previos, etc.' },
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
  age: z.coerce.number({invalid_type_error: t.errors.number}).min(18, t.errors.minAge).max(99),
  gender: z.string({ required_error: t.errors.required }),
  experience: z.string({ required_error: t.errors.required }),
  longestDistance: z.string({ required_error: t.errors.required }),
  weeklyVolume: z.string({ required_error: t.errors.required }),
  marathonDate: z.string({ required_error: t.errors.required }).min(1, t.errors.required),
  mainGoal: z.string({ required_error: t.errors.required }),
  otherGoal: z.string().optional(),
  trainingDays: z.array(z.string()).min(2, t.errors.minDays),
  gymAccess: z.boolean().default(false),
  currentInjury: z.string({ required_error: t.errors.required }),
  injuryDetails: z.string().optional(),
  sleepHours: z.string({ required_error: t.errors.required }),
  stressLevel: z.string({ required_error: t.errors.required }),
  additionalInfo: z.string().optional(),
  consent: z.boolean().refine(val => val === true, { message: t.errors.consent }),
}).refine(data => data.mainGoal !== 'Other' || (data.mainGoal === 'Other' && data.otherGoal && data.otherGoal.length > 0), {
    message: t.errors.required,
    path: ['otherGoal'],
}).refine(data => data.currentInjury === 'None' || (data.currentInjury !== 'None' && data.injuryDetails && data.injuryDetails.length > 0), {
    message: t.errors.required,
    path: ['injuryDetails'],
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
      trainingDays: [],
      gymAccess: false,
      consent: false,
    }
  });

  const watchMainGoal = watch('mainGoal');
  const watchCurrentInjury = watch('currentInjury');

  const handleNextStep = async () => {
    const fieldsPerStep: (keyof FormValues)[][] = [
      ['name', 'email', 'age', 'gender'],
      ['experience', 'longestDistance', 'weeklyVolume'],
      ['marathonDate', 'mainGoal', 'otherGoal', 'trainingDays', 'gymAccess'],
      ['currentInjury', 'injuryDetails', 'sleepHours', 'stressLevel', 'additionalInfo', 'consent']
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
        <Input name="age" label={t.fields.age.label} placeholder={t.fields.age.placeholder} type="number" />
        <RadioGroupField name="gender" label={t.fields.gender.label} options={t.fields.gender.options} />
      </div>

      <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
        <RadioGroupField name="experience" label={t.fields.experience.label} options={t.fields.experience.options} />
        <RadioGroupField name="longestDistance" label={t.fields.longestDistance.label} options={t.fields.longestDistance.options} />
        <RadioGroupField name="weeklyVolume" label={t.fields.weeklyVolume.label} options={t.fields.weeklyVolume.options} />
      </div>

      <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
        <Input name="marathonDate" label={t.fields.marathonDate.label} type="date" placeholder="" />
        <RadioGroupField name="mainGoal" label={t.fields.mainGoal.label} options={t.fields.mainGoal.options} />
        {watchMainGoal === 'Other' && <Input name="otherGoal" label={t.fields.otherGoal.label} placeholder={t.fields.otherGoal.placeholder} />}
        <CheckboxGroupField name="trainingDays" label={t.fields.trainingDays.label} options={t.fields.trainingDays.options} />
        <SingleCheckbox name="gymAccess" label={t.fields.gymAccess.label} />
      </div>

      <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
        <RadioGroupField name="currentInjury" label={t.fields.currentInjury.label} options={t.fields.currentInjury.options} />
        {watchCurrentInjury && watchCurrentInjury !== 'None' && <TextareaField name="injuryDetails" label={t.fields.injuryDetails.label} placeholder={t.fields.injuryDetails.placeholder} />}
        <RadioGroupField name="sleepHours" label={t.fields.sleepHours.label} options={t.fields.sleepHours.options} />
        <RadioGroupField name="stressLevel" label={t.fields.stressLevel.label} options={t.fields.stressLevel.options} />
        <TextareaField name="additionalInfo" label={t.fields.additionalInfo.label} placeholder={t.fields.additionalInfo.placeholder} />
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

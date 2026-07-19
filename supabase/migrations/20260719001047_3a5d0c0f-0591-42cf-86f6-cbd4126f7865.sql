
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  objective TEXT NOT NULL,
  results TEXT NOT NULL,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update projects" ON public.projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete projects" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- News
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag TEXT NOT NULL DEFAULT 'Noticia',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Admins insert news" ON public.news FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update news" ON public.news FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete news" ON public.news FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Impact counters
CREATE TABLE public.impact_counters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value BIGINT NOT NULL DEFAULT 0,
  suffix TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.impact_counters TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.impact_counters TO authenticated;
GRANT ALL ON public.impact_counters TO service_role;
ALTER TABLE public.impact_counters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read impact" ON public.impact_counters FOR SELECT USING (true);
CREATE POLICY "Admins insert impact" ON public.impact_counters FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update impact" ON public.impact_counters FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete impact" ON public.impact_counters FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER impact_updated_at BEFORE UPDATE ON public.impact_counters FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Focus areas
CREATE TABLE public.focus_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL DEFAULT 'Users',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.focus_areas TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.focus_areas TO authenticated;
GRANT ALL ON public.focus_areas TO service_role;
ALTER TABLE public.focus_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read focus" ON public.focus_areas FOR SELECT USING (true);
CREATE POLICY "Admins insert focus" ON public.focus_areas FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update focus" ON public.focus_areas FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete focus" ON public.focus_areas FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER focus_updated_at BEFORE UPDATE ON public.focus_areas FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Pillars
CREATE TABLE public.pillars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pillars TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pillars TO authenticated;
GRANT ALL ON public.pillars TO service_role;
ALTER TABLE public.pillars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pillars" ON public.pillars FOR SELECT USING (true);
CREATE POLICY "Admins insert pillars" ON public.pillars FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update pillars" ON public.pillars FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete pillars" ON public.pillars FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER pillars_updated_at BEFORE UPDATE ON public.pillars FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Seed initial content from current hardcoded site
INSERT INTO public.projects (name, location, description, objective, results, display_order) VALUES
('Reforestando el Páramo', 'Boyacá, Colombia', 'Restauración ecológica de zonas degradadas con especies nativas y participación comunitaria.', 'Plantar 50.000 árboles en 3 años', '12.500 árboles sembrados · 8 veredas vinculadas', 1),
('Aulas Conectadas', 'Cauca, Colombia', 'Educación digital y conectividad para escuelas rurales con docentes capacitados.', 'Llegar a 30 escuelas rurales', '18 escuelas equipadas · 1.200 estudiantes', 2),
('Café con Propósito', 'Huila, Colombia', 'Fortalecimiento de cooperativas cafeteras con prácticas sostenibles y comercio justo.', 'Acompañar 200 familias productoras', '150 familias activas · +35 % ingreso promedio', 3);

INSERT INTO public.news (tag, published_date, title, excerpt, display_order) VALUES
('Noticia', '2026-05-15', 'PRODESAR firma alianza con cooperativa cafetera del Huila', 'Una nueva alianza fortalecerá a 150 familias productoras con prácticas sostenibles.', 1),
('Evento', '2026-06-02', 'Foro regional: Innovación social en territorios rurales', 'Convocamos a líderes y aliados para reflexionar sobre los retos del desarrollo sostenible.', 2),
('Convocatoria', '2026-06-20', 'Abierta inscripción a la Escuela de Liderazgo Comunitario 2026', 'Cupos limitados para jóvenes líderes de comunidades vinculadas a nuestros proyectos.', 3);

INSERT INTO public.impact_counters (label, value, suffix, display_order) VALUES
('Comunidades beneficiadas', 42, '+', 1),
('Personas capacitadas', 5800, '+', 2),
('Proyectos ejecutados', 27, '', 3),
('Árboles sembrados', 12500, '+', 4),
('Alianzas estratégicas', 18, '', 5);

INSERT INTO public.focus_areas (icon_name, title, description, display_order) VALUES
('Users', 'Desarrollo comunitario', 'Fortalecimiento del tejido social y la organización de las comunidades.', 1),
('GraduationCap', 'Educación y capacitación', 'Formación que abre oportunidades y construye capacidades locales.', 2),
('Leaf', 'Medio ambiente y conservación', 'Protección de ecosistemas y restauración de la biodiversidad.', 3),
('Briefcase', 'Emprendimiento y fortalecimiento económico', 'Acompañamiento a iniciativas productivas sostenibles.', 4),
('Lightbulb', 'Innovación social', 'Soluciones creativas a los retos sociales más urgentes.', 5),
('ClipboardList', 'Gestión de proyectos sostenibles', 'Formulación, ejecución y evaluación con altos estándares.', 6);

INSERT INTO public.pillars (kind, title, description, display_order) VALUES
('social', 'Social', 'Fortalecemos comunidades, tejido humano y capacidades locales para transformar realidades.', 1),
('economic', 'Económico', 'Impulsamos emprendimientos y modelos productivos sostenibles que generan bienestar.', 2),
('environmental', 'Ambiental', 'Protegemos y restauramos ecosistemas con soluciones basadas en la naturaleza.', 3);

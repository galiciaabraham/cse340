-- Query to add a new user row
INSERT INTO public.account
(account_firstname, account_lastname, account_email, account_password)
VALUES
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Query to modify account type
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = '1';

-- Query to delete account 
DELETE FROM public.account
WHERE account_id = '1';

-- Query to update product description
UPDATE public.inventory
SET inv_description = REPLACE(inv_description,'small interiors', 'huge interior')
WHERE inv_id = 10;

--Query to get the Sports car
SELECT inv_make, inv_model FROM public.inventory JOIN classification
ON public.inventory.classification_id = public.classification.classification_id
WHERE public.inventory.classification_id = 2;

-- Query to update images url
UPDATE public.inventory 
SET inv_image = REPLACE(inv_image, '/images/','/images/vehicles/'), 
inv_thumbnail = REPLACE(inv_thumbnail, '/images/','/images/vehicles/');
SELECT * FROM public.inventory;

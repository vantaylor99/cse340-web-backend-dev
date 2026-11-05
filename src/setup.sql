-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL        PRIMARY KEY,
    name            VARCHAR (150) NOT NULL,
    description     TEXT          NOT NULL,
    contact_email   VARCHAR (255) NOT NULL,
    logo_filename   VARCHAR (255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT  INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES                    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
                          ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
                          ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Projects Table
-- ========================================
CREATE TABLE service_projects (
    project_id      SERIAL        PRIMARY KEY,
    organization_id INT           NOT NULL REFERENCES organization (organization_id),
    title           VARCHAR (150) NOT NULL,
    description     TEXT          NOT NULL,
    location        TEXT          NOT NULL,
    date            DATE          NOT NULL
);

-- ========================================
-- Insert Sample Data: Service Projects
-- ========================================
INSERT  INTO service_projects (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES                        -- ========================================
                              -- Organization 1: BrightFuture Builders
                              -- ========================================
                              (1, 'Community Playground Construction', 'Build a safe and accessible playground for children in the local community.', 'Rexburg, ID', '2026-11-15'),
                              (1, 'Affordable Housing Renovation', 'Renovate existing homes to provide affordable housing for families in need.', 'Idaho Falls, ID', '2026-11-22'),
                              (1, 'Community Center Repairs', 'Repair and improve facilities at the local community center.', 'Rexburg, ID', '2026-12-05'),
                              (1, 'Park Bench Installation', 'Install new benches and seating areas in public parks.', 'Sugar City, ID', '2026-12-12'),
                              (1, 'Neighborhood Cleanup and Repairs', 'Clean up neighborhoods and perform minor repairs on public infrastructure.', 'St. Anthony, ID', '2026-12-19'),
                              -- ========================================
                              -- Organization 2: GreenHarvest Growers
                              -- ========================================
                              (2, 'Community Garden Planting', 'Plant vegetables and herbs in a community garden to support local food banks.', 'Rexburg, ID', '2027-04-10'),
                              (2, 'Urban Farming Workshop', 'Teach community members sustainable farming techniques and gardening skills.', 'Idaho Falls, ID', '2027-04-17'),
                              (2, 'School Garden Development', 'Help local schools establish educational gardens for students.', 'Sugar City, ID', '2027-04-24'),
                              (2, 'Composting Education Event', 'Educate residents about composting and reducing household food waste.', 'Rexburg, ID', '2027-05-01'),
                              (2, 'Farm-to-Table Community Harvest', 'Harvest locally grown produce and distribute it to families in need.', 'St. Anthony, ID', '2027-05-15'),
                              -- ========================================
                              -- Organization 3: UnityServe Volunteers
                              -- ========================================
                              (3, 'Food Bank Volunteer Day', 'Sort and distribute donated food to local families experiencing food insecurity.', 'Rexburg, ID', '2026-11-14'),
                              (3, 'Winter Clothing Drive', 'Collect, organize, and distribute warm clothing to individuals in need.', 'Idaho Falls, ID', '2026-11-28'),
                              (3, 'Senior Citizen Assistance', 'Assist elderly residents with household chores, grocery shopping, and yard maintenance.', 'Sugar City, ID', '2026-12-03'),
                              (3, 'Holiday Gift Distribution', 'Organize and distribute donated holiday gifts to children and families.', 'Rexburg, ID', '2026-12-20'),
                              (3, 'Community Literacy Program', 'Provide reading assistance and educational support to children and adults.', 'St. Anthony, ID', '2027-01-09');

-- ========================================
-- Categories and Service Project Categories
-- ========================================
CREATE TABLE categories (
    category_id SERIAL        PRIMARY KEY,
    name        VARCHAR (150) NOT NULL UNIQUE
);

CREATE TABLE service_project_categories (
    project_id  INT REFERENCES service_projects (project_id),
    category_id INT REFERENCES categories (category_id),
    PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Insert Sample Data: Categories
-- ========================================
INSERT INTO categories (name)
VALUES ('Construction & Repairs'),
       ('Food & Gardening'),
       ('Education'),
       ('Community Support');

-- Link seed projects using the IDs assigned in insert order above.
INSERT INTO service_project_categories (project_id, category_id)
VALUES (1, 1),  -- Community Playground Construction
       (2, 1),  -- Affordable Housing Renovation
       (3, 1),  -- Community Center Repairs
       (4, 1),  -- Park Bench Installation
       (5, 1),  -- Neighborhood Cleanup and Repairs
       (6, 2),  -- Community Garden Planting
       (7, 2), (7, 3),  -- Urban Farming Workshop
       (8, 2), (8, 3),  -- School Garden Development
       (9, 3),  -- Composting Education Event
       (10, 2), -- Farm-to-Table Community Harvest
       (11, 4), -- Food Bank Volunteer Day
       (12, 4), -- Winter Clothing Drive
       (13, 4), -- Senior Citizen Assistance
       (14, 4), -- Holiday Gift Distribution
       (15, 3); -- Community Literacy Program

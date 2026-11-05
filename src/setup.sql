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
    organization_id INT           NOT NULL FOREIGN KEY REFERENCES organization (organization_id),
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
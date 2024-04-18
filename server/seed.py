from faker import Faker
from app import app
from models import Landlord, Tenant, Lease, Property, Suite, Guarantor
from random import randint, choice
from config import db

fake = Faker()


def create_landlords():
    landlords = []
    for _ in range(1):
        landlord = Landlord(
            name='BODWARD PRESIDENTIAL CENTER, LLC',
            mailing_address=fake.address(),
            contact_number='+17543159683'
        )
        landlords.append(landlord)
    return landlords

def create_properties():
    properties = []
    landlords = Landlord.query.all()
    if not landlords:
        print("No landlords available to assign to properties.")
        return properties

    landlord = choice(landlords)
    property = Property(
        landlord_id=landlord.id,
        type='Shopping Mall',
        address='201 South State Road 7, Plantation FL. 33317'
    )
    properties.append(property)
    return properties

def create_tenants():
    tenants = []
    suites = Suite.query.all()

    for _ in range(25):
        tenant = Tenant(
            name=f'{fake.first_name()} {fake.last_name()}',
            trade_name=fake.company(),
            mailing_address=fake.address(),
            business_number=f'{fake.numerify("###-###-####")}',
            cell_number=f'{fake.numerify("###-###-####")}',
            # Assign a suite_id from the existing suites
            suite_id=choice(suites).id if suites else None

        )
        tenants.append(tenant)
    return tenants


def create_suites():
    suites = []
    properties = Property.query.all()
    tenants = Tenant.query.all()

    if not properties:
        print("No properties available to assign to suites.")
        return suites

    used_suite_numbers = set()
    for _ in range(50):
        suite_number = None
        
        # Generate a unique suite number
        while suite_number is None or suite_number in used_suite_numbers:
            suite_number = fake.random_int(min=100, max=999)
        
        # Add the generated suite number to the set of used suite numbers
        used_suite_numbers.add(suite_number)

        # Generate a random square footage (positive integer)
        square_feet = fake.random_int(min=100, max=5000)

        # Randomly select a property from existing properties
        property = choice(properties)

        # Create the suite object and add it to the suites list
        suite = Suite(
            property_id=property.id,
            suite_number=suite_number,
            square_feet=square_feet
        )
        suites.append(suite)
    
    return suites


def create_guarantors():
    guarantors = []
    tenants = Tenant.query.all()

    for _ in range(10):
        full_name = fake.name()
        date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=74)
        ssn = fake.numerify("###-##-####")
        
        if tenants:
            tenant = choice(tenants)
            guarantor = Guarantor(
                full_name=full_name,
                date_of_birth=date_of_birth,
                ssn=ssn,
                tenant_id=tenant.id
            )
            guarantors.append(guarantor)
    
    return guarantors

def create_leases():
    leases = []
    landlords = Landlord.query.all()
    properties = Property.query.all()
    tenants = Tenant.query.all()
    suites = Suite.query.all()
    guarantors = Guarantor.query.all()

    if not (landlords and properties and tenants and suites and guarantors):
        print("Not all necessary data is available to create leases.")
        return leases

    for _ in range(20):
        start_date = fake.date_between(start_date='-1y', end_date='today')

        landlord = choice(landlords)
        tenant = choice(tenants)

        lease = Lease(
            start_date=start_date,
            landlord_id=landlord.id,
            tenant_id=tenant.id,
            state=fake.state_abbr(),
            country="USA"
        )
        leases.append(lease)

    return leases

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()

        landlords = create_landlords(); db.session.add_all(landlords); db.session.commit()
        properties = create_properties(); db.session.add_all(properties); db.session.commit()
        suites = create_suites(); db.session.add_all(suites); db.session.commit()
        tenants = create_tenants(); db.session.add_all(tenants); db.session.commit()
        guarantors = create_guarantors(); db.session.add_all(guarantors); db.session.commit()
        leases = create_leases(); db.session.add_all(leases); db.session.commit()

        print("Seeding completed successfully!")

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import date
from config import db, bcrypt

# Models go here!

class Landlord(db.Model, SerializerMixin):
    __tablename__ = 'landlords'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    mailing_address = db.Column(db.String, nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)

    # Relationships
    properties = db.relationship('Property', back_populates='landlord')
    leases = db.relationship('Lease', back_populates='landlord')

    serialize_rules = ('-leases', '-properties.landlord_id')

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError("Name cannot be empty")
        return value
    
    @validates('mailing_address')
    def validate_mailing_address(self, key, value):
        if not value:
            raise ValueError("Mailing address cannot be empty")
        return value

class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlords.id'), nullable=False)
    type = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False, unique=True)

    # Relationships
    landlord = db.relationship('Landlord', back_populates='properties')
    suites = db.relationship('Suite', back_populates='property')

    serialize_rules = ('-landlord', '-suites.property_id')

    @validates('address')
    def validate_address(self, key, value):
        if not value:
            raise ValueError("Address cannot be empty")
        return value

class Tenant(db.Model, SerializerMixin):
    __tablename__ = 'tenants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    trade_name = db.Column(db.String, nullable=False)
    mailing_address = db.Column(db.String, nullable=False)
    business_number = db.Column(db.String(15), nullable=False)
    cell_number = db.Column(db.String(15), nullable=False)
    suite_id = db.Column(db.Integer, db.ForeignKey('suites.id'), nullable=True)


    # Relationships
    guarantors = db.relationship('Guarantor', back_populates='tenant') #cascading delete?
    suite = db.relationship('Suite', back_populates='tenant', uselist=False)
    lease = db.relationship('Lease', back_populates='tenant', uselist=False)

    serialize_rules = ('-guarantors.tenant_id', '-suite.tenant_id', '-lease')

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError("Name cannot be empty")
        return value

    @validates('trade_name')
    def validate_trade_name(self, key, value):
        if not value:
            raise ValueError("Trade name cannot be empty")
        return value

    @validates('mailing_address')
    def validate_mailing_address(self, key, value):
        if not value:
            raise ValueError("Mailing address cannot be empty")
        return value

class Suite(db.Model, SerializerMixin):
    __tablename__ = 'suites'

    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    suite_number = db.Column(db.Integer, unique=True)
    square_feet = db.Column(db.Integer)
    
    # Relationships
    property = db.relationship('Property', back_populates='suites')
    tenant = db.relationship('Tenant', back_populates='suite', uselist=False)

    tenant_id = association_proxy('tenant', 'id')

    serialize_rules = ('-property', '-tenant')
    
    @validates('suite_number')
    def validate_suite_number(self, key, value):
        if not (100 <= value <= 999):
            raise ValueError("Suite number must be between 100 and 999")

        return value

    @validates('square_feet')
    def validate_square_feet(self, key, value):
        if value is None or value <= 0:
            raise ValueError("Square feet must be a positive integer")

        return value

class Guarantor(db.Model, SerializerMixin):
    __tablename__ = 'guarantors'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenants.id'), nullable=False)
    full_name = db.Column(db.String, nullable=False, unique=True)
    date_of_birth = db.Column(db.Date, nullable=False)
    ssn = db.Column(db.Integer, unique=True)

    tenant = db.relationship('Tenant', back_populates='guarantors')

    serialize_rules = ('-tenant',)

    @validates('date_of_birth')
    def validate_date_of_birth(self, key, value):
        if not isinstance(value, date):
            raise ValueError("Date of birth must be a date")
        return value

    @validates('full_name')
    def validate_full_name(self, key, value):
        if not value:
            raise ValueError("Full name cannot be empty")
        return value

class Lease(db.Model, SerializerMixin):
    __tablename__ = 'leases'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlords.id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenants.id'), nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)

    # Relationships
    landlord = db.relationship('Landlord', back_populates='leases', uselist=False)
    tenant = db.relationship('Tenant', back_populates='lease', uselist=False)

    landlord_name = association_proxy('landlord', 'name')
    landlord_mailing_address = association_proxy('landlord', 'mailing_address')
    landlord_contact_number = association_proxy('landlord', 'contact_number')
    tenant_name = association_proxy('tenant', 'name')
    tenant_trade_name = association_proxy('tenant', 'trade_name')
    tenant_mailing_address = association_proxy('tenant', 'mailing_address')
    tenant_business_number = association_proxy('tenant', 'business_number')
    tenant_cell_number = association_proxy('tenant', 'cell_number')
    tenant_guarantors_full_names = association_proxy('tenant.guarantors', 'full_name')
    tenant_guarantors_date_of_births = association_proxy('tenant.guarantors', 'date_of_birth')
    tenant_guarantors_ssns = association_proxy('tenant.guarantors', 'ssn')
    property_type = association_proxy('tenant.suite.property', 'type')
    property_address = association_proxy('tenant.suite.property.address', 'address')
    suite_number = association_proxy('tenant.suite', 'suite_number')
    suite_square_feet = association_proxy('tenant.suite', 'square_feet')

    serialize_rules = ('-landlord.id', '-landlord.properties.suites')

    @validates('state', 'country')
    def validate_string_length(self, key, value):
        if len(value.strip()) == 0:
            raise ValueError("Value cannot be empty or whitespace only")
        return value

    @validates('start_date')
    def validate_start_date(self, key, value):
        if not isinstance(value, date):
            raise ValueError("Start date must be a date")

        return value

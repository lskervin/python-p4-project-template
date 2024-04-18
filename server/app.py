from config import app, db, api, bcrypt, CORS
from flask_restful import Resource
from flask import Flask, make_response, request
from models import Landlord, Tenant, Lease, Property, Suite, Guarantor
from datetime import datetime, date

date_format = '%m/%d/%Y'

def format_date(date_str):
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")
    return date_obj.strftime("%m/%d/%Y")

def revert_date_format(date_str):
    """Function to revert the date from mm/dd/yyyy format back to yyyy-mm-dd."""
    return datetime.strptime(date_str, date_format).strftime("%Y-%m-%d")



@app.route('/')
def home():
    return ''


class Landlords(Resource):

    def get(self):
        landlords = [landlord.to_dict(rules=())
                     for landlord in Landlord.query.all()]

        return make_response(landlords, 200)

    def post(self):

        fields = request.get_json()
        try:
            landlord = Landlord(
                name=fields['name'],
                mailing_address=fields['mailing_address'],
                contact_number=fields['contact_number']
            )
            db.session.add(landlord)
            db.session.commit()
            return make_response(landlord.to_dict(rules=()), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class LandlordById(Resource):

    def get(self, id):
        landlord = Landlord.query.filter(Landlord.id == id).one_or_none()

        if landlord is None:
            return make_response({'error': 'Landlord not found'}, 404)

        return make_response(landlord.to_dict(), 200)

    def patch(self, id):
        landlord = Landlord.query.filter(Landlord.id == id).one_or_none()

        if landlord is None:

            return make_response({'error': 'Landlord not found'}, 404)

        fields = request.get_json()
        try:
            for field in fields:
                setattr(landlord, field, fields[field])
            db.session.commit()

            return make_response(landlord.to_dict(rules=()), 202)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        landlord = Landlord.query.filter(Landlord.id == id).one_or_none()

        if landlord is None:
            return make_response({'error': 'Landlord not found'}, 404)

        db.session.delete(landlord)
        db.session.commit()
        return make_response({}, 204)

class Properties(Resource):

    def get(self):
        properties = [property.to_dict(rules=()) for property in Property.query.all()]
        return make_response(properties, 200)

    def post(self):
        fields = request.get_json()
        try:
            property = Property(
                type=fields['type'],
                address=fields['address'],
                landlord_id=fields['landlord_id']
            )
            db.session.add(property)
            db.session.commit()
            return make_response(property.to_dict(rules=()), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class PropertyById(Resource):

    def get(self, id):
        property = Property.query.filter(Property.id == id).one_or_none()

        if property is None:
            return make_response({'error': 'Property not found'}, 404)

        return make_response(property.to_dict(rules=()), 200)

    def patch(self, id):
        property = Property.query.filter(Property.id == id).one_or_none()

        if property is None:
            return make_response({'error': 'Property not found'}, 404)

        fields = request.get_json()
        try: 
            for field in fields:
                setattr(property, field, fields[field])
            db.session.commit()

            return make_response(property.to_dict(rules=()), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        property = Property.query.filter(Property.id == id).one_or_none()

        if property is None:
            return make_response({'error': 'Property not found'}, 404)

        db.session.delete(property)
        db.session.commit()
        return make_response({}, 204)
    
class Tenants(Resource):

    def get(self):
        tenants = [tenant.to_dict(rules=()) for tenant in Tenant.query.all()]
        return make_response(tenants, 200)

    def post(self):
        fields = request.get_json()
        try:
            tenant = Tenant(
                name=fields['name'],
                trade_name=fields['trade_name'],
                mailing_address=fields['mailing_address'],
                business_number=fields['business_number'],
                cell_number=fields['cell_number'],
                suite_id=fields['suite_id']
            )
            db.session.add(tenant)
            db.session.commit()
            return make_response(tenant.to_dict(rules=()), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class TenantById(Resource):

    def get(self, id):
        tenant = Tenant.query.filter(Tenant.id == id).one_or_none()

        if tenant is None:
            return make_response({'error': 'Tenant not found'}, 404)

        return make_response(tenant.to_dict(rules=()), 200)

    def patch(self, id):
        tenant = Tenant.query.filter(Tenant.id == id).one_or_none()

        if tenant is None:
            return make_response({'error': 'Tenant not found'}, 404)

        fields = request.get_json()
        try:
            for field in fields:
                setattr(tenant, field, fields[field])
            db.session.commit()

            return make_response(tenant.to_dict(rules=()), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        tenant = Tenant.query.filter(Tenant.id == id).one_or_none()

        if tenant is None:
            return make_response({'error': 'Tenant not found'}, 404)

        db.session.delete(tenant)
        db.session.commit()
        return make_response({}, 204)

class Suites(Resource):

    def get(self):
        suites = [suite.to_dict(rules=()) for suite in Suite.query.all()]
        return make_response(suites, 200)

    def post(self):
        fields = request.get_json()
        try:
            suite = Suite(
                property_id=fields['property_id'],
                suite_number=fields['suite_number'],
                square_feet=fields['square_feet']
            )
            db.session.add(suite)
            db.session.commit()
            return make_response(suite.to_dict(rules=()), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class SuiteById(Resource):

    def get(self, id):
        suite = Suite.query.filter(Suite.id == id).one_or_none()

        if suite is None:
            return make_response({'error': 'Suite not found'}, 404)

        return make_response(suite.to_dict(rules=()), 200)

    def patch(self, id):
        suite = Suite.query.filter(Suite.id == id).one_or_none()

        if suite is None:
            return make_response({'error': 'Suite not found'}, 404)

        fields = request.get_json()
        try:
            for field in fields:
                setattr(suite, field, fields[field])
            db.session.commit()

            return make_response(suite.to_dict(rules=()), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        suite = Suite.query.filter(Suite.id == id).one_or_none()

        if suite is None:
            return make_response({'error': 'Suite not found'}, 404)

        db.session.delete(suite)
        db.session.commit()
        return make_response({}, 204)

class Guarantors(Resource):

    def get(self):
        guarantors = [guarantor.to_dict() for guarantor in Guarantor.query.all()]

        # Apply the date formatting to each guarantor's `date_of_birth` field
        for guarantor in guarantors:
            if 'date_of_birth' in guarantor:
                guarantor['date_of_birth'] = format_date(guarantor['date_of_birth'])

        return make_response(guarantors, 200)

    def post(self):
        # Get the input data as JSON
        fields = request.get_json()
        
        try:
            # Revert the date_of_birth format from mm/dd/yyyy back to yyyy-mm-dd
            if 'date_of_birth' in fields:
                fields['date_of_birth'] = revert_date_format(fields['date_of_birth'])
            
            # Create a new Guarantor object with the input data
            guarantor = Guarantor(
                tenant_id=fields['tenant_id'],
                full_name=fields['full_name'],
                date_of_birth=fields['date_of_birth'],
                ssn=fields['ssn']
            )
            
            # Add the new Guarantor object to the session and commit the changes
            db.session.add(guarantor)
            db.session.commit()
            
            # Return the newly created Guarantor as a dictionary
            return make_response(guarantor.to_dict(), 201)
        except ValueError as e:
            # Return error if date parsing fails or other validation errors occur
            return make_response({"errors": [str(e)]}, 400)

class GuarantorById(Resource):

    def get(self, id):
        guarantor = Guarantor.query.filter(Guarantor.id == id).one_or_none()

        if guarantor is None:
            return make_response({'error': 'Guarantor not found'}, 404)

        return make_response(guarantor.to_dict(rules=()), 200)

    def patch(self, id):
        guarantor = Guarantor.query.filter(Guarantor.id == id).one_or_none()

        if guarantor is None:
            return make_response({'error': 'Guarantor not found'}, 404)

        fields = request.get_json()
        try:
            for field in fields:
                setattr(guarantor, field, fields[field])
            db.session.commit()

            return make_response(guarantor.to_dict(rules=()), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        guarantor = Guarantor.query.filter(Guarantor.id == id).one_or_none()

        if guarantor is None:
            return make_response({'error': 'Guarantor not found'}, 404)

        db.session.delete(guarantor)
        db.session.commit()
        return make_response({}, 204)

class Leases(Resource):

    def get(self):
        leases = [lease.to_dict(rules=()) for lease in Lease.query.all()]
        for lease in leases:
            if 'start_date' in lease:
                lease['start_date'] = format_date(lease['start_date'])
        return make_response(leases, 200)

    def post(self):
        fields = request.get_json()
        try:
            lease = Lease(
                start_date=fields['start_date'],
                landlord_id=fields['landlord_id'],
                property_id=fields['property_id'],
                tenant_id=fields['tenant_id'],
                guarantor_id=fields['guarantor_id'],
                suite_id=fields['suite_id'],
                state=fields['state'],
                country=fields['country']
            )
            db.session.add(lease)
            db.session.commit()
            return make_response(lease.to_dict(rules=()), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class LeaseById(Resource):

    def get(self, id):
        lease = Lease.query.filter(Lease.id == id).one_or_none()

        if lease is None:
            return make_response({'error': 'Lease not found'}, 404)

        return make_response(lease.to_dict(rules=()), 200)

    def patch(self, id):
        lease = Lease.query.filter(Lease.id == id).one_or_none()

        if lease is None:
            return make_response({'error': 'Lease not found'}, 404)

        fields = request.get_json()
        try:
            for field in fields:
                setattr(lease, field, fields[field])
            db.session.commit()

            return make_response(lease.to_dict(rules=()), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        lease = Lease.query.filter(Lease.id == id).one_or_none()

        if lease is None:
            return make_response({'error': 'Lease not found'}, 404)

        db.session.delete(lease)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(Landlords, "/landlords")    
api.add_resource(LandlordById, "/landlords/<int:id>")
api.add_resource(Properties, "/properties")
api.add_resource(PropertyById, "/properties/<int:id>")
api.add_resource(Tenants, "/tenants")
api.add_resource(TenantById, "/tenants/<int:id>")
api.add_resource(Suites, "/suites")
api.add_resource(SuiteById, "/suites/<int:id>")
api.add_resource(Guarantors, "/guarantors")
api.add_resource(GuarantorById, "/guarantors/<int:id>")
api.add_resource(Leases, "/leases")
api.add_resource(LeaseById, "/leases/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

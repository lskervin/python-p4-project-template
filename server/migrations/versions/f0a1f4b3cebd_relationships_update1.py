"""relationships-update1

Revision ID: f0a1f4b3cebd
Revises: 
Create Date: 2024-04-12 16:30:42.386863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0a1f4b3cebd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('landlords',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('mailing_address', sa.String(), nullable=False),
    sa.Column('contact_number', sa.String(length=15), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('landlord_id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['landlord_id'], ['landlords.id'], name=op.f('fk_properties_landlord_id_landlords')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address')
    )
    op.create_table('suites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_id', sa.Integer(), nullable=False),
    sa.Column('suite_number', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['properties.id'], name=op.f('fk_suites_property_id_properties')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('suite_number')
    )
    op.create_table('tenants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('trade_name', sa.String(), nullable=False),
    sa.Column('mailing_address', sa.String(), nullable=False),
    sa.Column('business_number', sa.String(length=15), nullable=False),
    sa.Column('cell_number', sa.String(length=15), nullable=False),
    sa.Column('suite_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['suite_id'], ['suites.id'], name=op.f('fk_tenants_suite_id_suites')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('guarantors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('ssn', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenants.id'], name=op.f('fk_guarantors_tenant_id_tenants')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('full_name'),
    sa.UniqueConstraint('ssn')
    )
    op.create_table('leases',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('landlord_id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['landlord_id'], ['landlords.id'], name=op.f('fk_leases_landlord_id_landlords')),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenants.id'], name=op.f('fk_leases_tenant_id_tenants')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('leases')
    op.drop_table('guarantors')
    op.drop_table('tenants')
    op.drop_table('suites')
    op.drop_table('properties')
    op.drop_table('landlords')
    # ### end Alembic commands ###

HoneyHive TypeScript SDK Documentation
=======================================

Welcome to the HoneyHive TypeScript SDK documentation. This SDK provides a comprehensive interface for interacting with the HoneyHive platform.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   getting-started
   sdk/index
   models/index

Installation
------------

Install the SDK using npm:

.. code-block:: bash

   npm install honeyhive

Or using yarn:

.. code-block:: bash

   yarn add honeyhive

Quick Start
-----------

.. code-block:: typescript

   import { HoneyHive } from "honeyhive";

   const client = new HoneyHive({
     bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
   });

   // Start using the SDK
   const result = await client.session.startSession({
     session: {
       project: "my-project",
       sessionName: "my-session",
       source: "my-app",
     },
   });

Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

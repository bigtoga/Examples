As of 2020, this is mostly limited to neural networks and deep learning usage. 

Sci-kit Learn does not use:
> Will you add GPU support?
*No, or at least not in the near future. The main reason is that GPU support will introduce many software dependencies and introduce platform specific issues. scikit-learn is designed to be easy to install on a wide variety of platforms. Outside of neural networks, GPUs don’t play a large role in machine learning today, and much larger gains in speed can often be achieved by a careful choice of algorithms.*
> Why is there no support for deep or reinforcement learning / Will there be support for deep or reinforcement learning in scikit-learn?

*Deep learning and reinforcement learning both require a rich vocabulary to define an architecture, with deep learning additionally requiring GPUs for efficient computing. However, neither of these fit within the design constraints of scikit-learn; as a result, deep learning and reinforcement learning are currently out of scope for what scikit-learn seeks to achieve.

You can find more information about addition of gpu support at Will you add GPU support?.

Note that scikit-learn currently implements a simple multilayer perceptron in sklearn.neural_network. We will only accept bug fixes for this module. If you want to implement more complex deep learning models, please turn to popular deep learning frameworks such as **tensorflow, keras and pytorch**.*